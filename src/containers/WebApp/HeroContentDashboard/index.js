import { Line, Bar, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import Heading from "common/components/Heading";
import Container from "common/components/UI/Container";
import BannerArea from "./herocontentdashboard.style.js";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale, // Import the RadialLinearScale for radial charts
} from "chart.js";

import { fetchSlots, fetchSearchDetails, fetchLeads } from "common/api/api.js";
import { useFileSystemPublicRoutes } from "../../../../next.config.js";

const CollapsibleRow = ({
  backgroundColor,
  title,
  details,
  icon,
  onClick,
  isExpanded,
}) => {
  return (
    <div className="CollapsibleRow" onClick={onClick}>
      <div className="row-header" style={{ backgroundColor }}>
        <span
          className="title-text"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "80%",
          }}
        >
          {title}
        </span>
        {icon}
      </div>
      <div
        className={`data ${isExpanded ? "expanded" : "collapsed"}`}
        style={{ backgroundColor }}
      >
        {details}
      </div>
    </div>
  );
};

const HeroContentDashboard = () => {
  const [showClients, setShowClients] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);

  const [activeJobs, setActiveJobs] = useState([]);
  const [pastJobs, setPastJobs] = useState([]);
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [expandedClient, setExpandedClient] = useState(null);
  const { userData } = useSelector((state) => state.user);
  const authToken = useSelector((state) => state.auth.authToken);
  const businessId = userData.provider_id;

  const [searchDetailsByZipcode, setSearchDetailsByZipcode] = useState({});
  const [categoryZipcodeChartData, setCategoryZipcodeChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Category Search Count",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const [leadsCategoryData, setLeadsCategoryData] = useState({
    labels: [],
    datasets: [
      {
        label: "Leads by Category",
        data: [],
        backgroundColor: [
          "rgba(255, 159, 64, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 205, 86, 0.6)",
        ],
      },
    ],
  });

  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale // Register the RadialLinearScale
  );

  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [],
  });
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [],
  });

  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [],
  });

  const [doughnutData, setDoughnutData] = useState({
    labels: [],
    datasets: [],
  });

  setDoughnutData;
  function determineStatus(slot) {
    if (slot.cancelled) return "Cancelled";
    if (slot.noshow) return "NoShow";
    if (slot.completed) return "Completed";
    if (slot.confirmed) return "Confirmed";
    if (slot.rescheduled) return "Rescheduled";
    if (slot.booked) return "Booked";
    return "Open"; // Default status if none of the above
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSlots(businessId, authToken);
        "inside Dashboard", response.data;

        // Check if data.clients is not null and is an array
        if (response.data) {
          ("Inside setting data");
          const updateActiveJobs = [];
          const updatePastJobs = [];

          response.data.forEach((slot, index) => {
            const baseData = {
              id: index + 1,
              name: slot.username,
              startTime: slot.startTime,
              endTime: slot.endTime,
              status: determineStatus(slot),
              appointments: [
                {
                  date: slot.date,
                  startTime: slot.startTime,
                  endTime: slot.endTime,
                  description: slot.job_description,
                  selectedService: slot.selectedServiceTypes,
                  phone: slot.user_phone,
                  status: determineStatus(slot),
                },
              ],
            };

            const status = determineStatus(slot);

            if (
              ["Confirmed", "Rescheduled", "Booked", "Open"].includes(status)
            ) {
              updateActiveJobs.push(baseData);
            } else if (["Cancelled", "NoShow", "Completed"].includes(status)) {
              updatePastJobs.push(baseData);
            }
          });

          setActiveJobs(updateActiveJobs);
          setPastJobs(updatePastJobs);
          // Counting service type appointments
          let serviceTypeCounts = {};
          if (Array.isArray(response.data)) {
            response.data.forEach((slot) => {
              if (Array.isArray(slot.selectedServiceTypes)) {
                slot.selectedServiceTypes.forEach((serviceType) => {
                  serviceTypeCounts[serviceType] =
                    (serviceTypeCounts[serviceType] || 0) + 1;
                });
              }
            });
          }

          // Constructing barData from the counts
          const serviceTypes = Object.keys(serviceTypeCounts);
          const appointmentCounts = serviceTypes.map(
            (serviceType) => serviceTypeCounts[serviceType]
          );

          const newBarData = {
            labels: serviceTypes,
            datasets: [
              {
                label: "Appointments",
                data: appointmentCounts,
                backgroundColor: [
                  "rgba(75,192,192,0.6)",
                  "rgba(255,99,132,0.6)",
                  "rgba(255,206,86,0.6)",
                  // ... Add more colors if you expect more service types
                ],
              },
            ],
          };

          let statusCounts = {
            Confirmed: 0,
            Booked: 0,
            Cancelled: 0,
            NoShow: 0,
            Rescheduled: 0,
            Completed: 0,
            Open: 0,
          };

          response.data?.forEach((slot) => {
            const status = determineStatus(slot);

            if (status === "Confirmed") statusCounts.Confirmed++;
            if (status === "Booked") statusCounts.Booked++;
            if (status === "Cancelled") statusCounts.Cancelled++;
            if (status === "NoShow") statusCounts.NoShow++;
            if (status === "Rescheduled") statusCounts.Rescheduled++;
            if (status === "Completed") statusCounts.Completed++;
            if (status === "Open") statusCounts.Open++;
            // "Open" slots aren't accounted for in the pie chart based on the provided labels
          });

          const newPieData = {
            labels: [
              "Open",
              "Confirmed",
              "Booked",
              "Cancelled",
              "NoShow",
              "Rescheduled",
              "Completed",
            ],
            datasets: [
              {
                data: [
                  statusCounts.Open,
                  statusCounts.Confirmed,
                  statusCounts.Booked,
                  statusCounts.Cancelled,
                  statusCounts.NoShow,
                  statusCounts.Rescheduled,
                  statusCounts.Completed,
                ],
                backgroundColor: [
                  "#FF6384", // Vibrant pink
                  "#36A2EB", // Vibrant blue
                  "#FFCE56", // Vibrant yellow
                  "#FF9F40", // Vibrant orange
                  "#4BC0C0", // Vibrant teal
                  "#9966FF", // Vibrant purple
                  "#C9CB3F", // Vibrant lime
                ],
              },
            ],
          };

          // Tally for booking state
          let bookingStateCounts = {
            Active: 0,
            Inactive: 0,
            Archived: 0,
          };

          const today = new Date();
          today.setHours(0, 0, 0, 0); // Setting the time to midnight for accurate comparison

          response.data.forEach((slot) => {
            const status = determineStatus(slot);

            // Count status for pie chart
            if (status === "Confirmed") statusCounts.Confirmed++;
            if (status === "Booked") statusCounts.Booked++;
            if (status === "Cancelled") statusCounts.Cancelled++;
            if (status === "NoShow") statusCounts.NoShow++;
            if (status === "Rescheduled") statusCounts.Rescheduled++;
            if (status === "Completed") statusCounts.Completed++;
            if (status === "Open") statusCounts.Open++;

            // Determine and count booking state
            const slotDate = new Date(slot.date);
            if (slotDate >= today) {
              if (
                status === "Confirmed" ||
                status === "Booked" ||
                status === "Rescheduled" ||
                status === "Open"
              ) {
                bookingStateCounts.Active++;
              } else {
                bookingStateCounts.Inactive++;
              }
            } else {
              if (
                status === "Completed" ||
                status === "Cancelled" ||
                status === "NoShow"
              ) {
                bookingStateCounts.Archived++;
              } else {
                bookingStateCounts.Inactive++;
              }
            }
          });

          const newDoughnutData = {
            labels: ["Active", "Inactive", "Archieved"],
            datasets: [
              {
                data: [
                  bookingStateCounts.Active,
                  bookingStateCounts.Inactive,
                  bookingStateCounts.Archived,
                ],
                backgroundColor: [
                  "rgba(0, 123, 255, 0.9)", // Vibrant blue
                  "rgba(220, 53, 69, 0.9)", // Vibrant red
                  "rgba(255, 193, 7, 0.9)", // Vibrant yellow
                ],
              },
            ],
          };

          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          const bookingTrends = Array(12).fill(0);
          const cancellationTrends = Array(12).fill(0);
          const noShowTrends = Array(12).fill(0);
          const newCustomerTrends = Array(12).fill(0);
          const returningCustomerTrends = Array(12).fill(0);
          let usernames = {};

          function getDynamicMonthRange(currentMonthIndex) {
            const desiredRange = [];
            for (let i = -3; i <= 3; i++) {
              let index = (currentMonthIndex + i + 12) % 12;
              desiredRange.push(months[index]);
            }
            return desiredRange;
          }

          response.data.forEach((slot) => {
            const monthIndex = new Date(slot.date).getMonth(); // getMonth() returns 0-11 for Jan-Dec
            if (
              (slot.booked || slot.confirmed) &&
              !slot.cancelled &&
              !slot.noshow
            ) {
              bookingTrends[monthIndex]++;
            }
            if (slot.cancelled) {
              cancellationTrends[monthIndex]++;
            }
            if (slot.noshow) {
              noShowTrends[monthIndex]++;
            }
            // Incrementing the count of each username
            usernames[slot.username] = (usernames[slot.username] || 0) + 1;
          });

          // Check each username to determine if they are new or returning
          for (let user in usernames) {
            let matchingSlot = response.data.find(
              (slot) => slot.username === user
            );

            if (!matchingSlot) {
              console.error(`No matching slot found for username: ${user}`);
              continue;
            }

            if (usernames[user] === 1) {
              newCustomerTrends[new Date(matchingSlot.date).getMonth()]++;
            } else if (usernames[user] > 1) {
              returningCustomerTrends[new Date(matchingSlot.date).getMonth()]++;
            }
          }
          const currentMonthIndex = new Date().getMonth();
          const dynamicMonths = getDynamicMonthRange(currentMonthIndex);

          const filterTrendsByMonth = (trendArray) => {
            return dynamicMonths.map(
              (month) => trendArray[months.indexOf(month)]
            );
          };

          const dynamicBookingTrends = filterTrendsByMonth(bookingTrends);
          const dynamicCancellationTrends =
            filterTrendsByMonth(cancellationTrends);
          const dynamicNoShowTrends = filterTrendsByMonth(noShowTrends);
          const dynamicNewCustomerTrends =
            filterTrendsByMonth(newCustomerTrends);
          const dynamicReturningCustomerTrends = filterTrendsByMonth(
            returningCustomerTrends
          );

          const newLineData = {
            labels: dynamicMonths,
            datasets: [
              {
                label: "Bookings",
                data: dynamicBookingTrends,
                borderColor: "#007bff", // Vibrant blue
                fill: false,
              },
              {
                label: "Cancellations",
                data: dynamicCancellationTrends,
                borderColor: "#dc3545", // Vibrant red
                fill: false,
              },
              {
                label: "No-Shows",
                data: dynamicNoShowTrends,
                borderColor: "#6c757d", // Dark grey
                fill: false,
              },
              {
                label: "New Customers",
                data: dynamicNewCustomerTrends,
                borderColor: "#28a745", // Vibrant green
                fill: false,
              },
              {
                label: "Returning Customers",
                data: dynamicReturningCustomerTrends,
                borderColor: "#6f42c1", // Vibrant purple
                fill: false,
              },
            ],
          };

          setLineData(newLineData);
          setDoughnutData(newDoughnutData);
          setBarData(newBarData);
          setPieData(newPieData); // Assuming you have a state called pieData and a function to update it
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const processDataForChart = (data) => {
    // Assuming data is an object with zip codes as keys
    const categories = new Set();
    const dataByZip = {};

    // First collect all categories and initialize datasets for each zip code
    Object.keys(data).forEach((zipCode) => {
      data[zipCode].forEach((item) => {
        categories.add(item.category);
      });

      dataByZip[zipCode] = {
        label: `ZIP ${zipCode}`,
        data: [],
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Choose your color
        borderColor: "rgba(0, 0, 0, 1)", // Choose your color
      };
    });

    const categoryArray = Array.from(categories).sort();
    const chartData = {
      labels: categoryArray,
      datasets: Object.values(dataByZip),
    };

    // Fill in the data for each zip code dataset
    Object.keys(data).forEach((zipCode) => {
      const zipData = new Array(categoryArray.length).fill(0);
      data[zipCode].forEach((item) => {
        const index = categoryArray.indexOf(item.category);
        if (index !== -1) {
          zipData[index] += 1; // Or however you count the data
        }
      });
      dataByZip[zipCode].data = zipData;
    });
    Object.keys(dataByZip).forEach((zipCode, index) => {
      const colorIndex = index % pastelColors.length; // To cycle through the colors
      dataByZip[zipCode].backgroundColor = pastelColors[colorIndex];
      dataByZip[zipCode].borderColor = pastelColors[colorIndex].replace(
        "0.6",
        "1"
      ); // Slightly more opaque for the border
    });

    return chartData;
  };

  const chartOptions = {
    scales: {
      x: {
        // Configure the X-axis to show category labels
        title: {
          display: true,
          text: "Categories",
          color: "#333",
          font: {
            size: 16,
            weight: "bold",
          },
        },
        ticks: {
          // Improve legibility of the x-axis labels
          autoSkip: false,
          maxRotation: 90,
          minRotation: 45,
        },
        grid: {
          display: false, // Hide vertical grid lines
        },
      },
      // Dynamically generate a Y-axis for each ZIP code dataset
      ...Object.keys(categoryZipcodeChartData.dataByZip || {}).reduce(
        (acc, zipcode, index) => {
          acc[`y-axis-${zipcode}`] = {
            type: "linear",
            display: true,
            position: index % 2 === 0 ? "left" : "right", // Alternate sides for clarity
            title: {
              display: true,
              text: `Count (ZIP ${zipcode})`, // Describe each Y-axis
              color: "#333",
              font: {
                size: 16,
                weight: "bold",
              },
            },
            ticks: {
              beginAtZero: true, // Ensure that the scale starts at zero
              precision: 0, // Avoid decimal counts for better readability
            },
          };
          return acc;
        },
        {}
      ),
    },
    plugins: {
      tooltip: {
        // Configure the tooltip for better data display
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            // Customize tooltip to show the data clearly
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat().format(context.parsed.y);
            }
            return label;
          },
        },
      },
      legend: {
        // Customize the legend to ensure it is readable and does not overlap with the chart
        position: "top",
        align: "center",
        labels: {
          usePointStyle: true, // Use point style for a cleaner look
          padding: 20, // Add padding between legend items for better readability
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Ensure the chart is responsive and fits in its container
    animation: {
      duration: 500, // Reduce the animation duration to make the chart feel snappier
    },
  };

  const pastelColors = [
    "rgba(255, 159, 64, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(255, 205, 86, 0.6)",
    "rgba(186, 225, 255, 0.6)", // pastel blue
    "rgba(255, 179, 186, 0.6  dd)", // pastel purple
    // Add more colors as needed
  ];
  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const response = await fetchSearchDetails(businessId, authToken);
        if (response && response.data) {
          const processedData = processDataForChart(response.data);
          setCategoryZipcodeChartData(processedData);
        } else {
          console.error("Unexpected response data format:", response);
        }
      } catch (error) {
        console.error("Error fetching search data:", error);
      }
    };

    fetchSearchData();
  }, [businessId, authToken]);

  const processLeadsDataForChart = (data) => {
    "Processing leads data:", data; // Add this line
    const categories = new Set();
    const dataByCategory = {};

    data.forEach((lead) => {
      lead.selectedServiceTypes.forEach((category) => {
        categories.add(category);
        if (!dataByCategory[category]) {
          dataByCategory[category] = 0;
        }
        dataByCategory[category]++;
      });
    });

    const categoryArray = Array.from(categories).sort();
    const countData = categoryArray.map((category) => dataByCategory[category]);

    const chartData = {
      labels: categoryArray,
      datasets: [
        {
          label: "Leads by Category",
          data: countData,
          backgroundColor: pastelColors.slice(0, categoryArray.length),
        },
      ],
    };
    "Processed chart data:", chartData; // Add this line

    return chartData;
  };

  useEffect(() => {
    const fetchLeadsData = async () => {
      try {
        const response = await fetchLeads(businessId, authToken);
        "Leads data:", response.data; // Add this line
        if (response && response.data) {
          const processedData = processLeadsDataForChart(response.data.payload);
          setLeadsCategoryData(processedData);
        } else {
          console.error("Unexpected response data format:", response);
        }
      } catch (error) {
        console.error("Error fetching leads data:", error);
      }
    };

    fetchLeadsData();
  }, [businessId, authToken]);

  return (
    <BannerArea id="banner_section">
      <Container className="Container">
        <Heading as="h2" content="Dashboard" />

        <div className="chartContainer">
          <div className="rightPanel">
            <h3>Analytics</h3>
            {/* Charts */}
            <div className="chart-row">
              <div className="chart-container">
                <h4>Category Search by ZIP Code (Last 7 Days)</h4>
                {categoryZipcodeChartData && (
                  <Bar data={categoryZipcodeChartData} options={chartOptions} />
                )}
              </div>
              <div className="chart-container">
                <h4>Leads Generated by Category</h4>
                <PolarArea
                  data={leadsCategoryData}
                  options={{ responsive: true }}
                />
              </div>
            </div>
            <div className="chart-row">
              <div className="chart-container">
                <h4>Monthly Performance Trend</h4>
                <Line
                  data={lineData}
                  className="chart"
                  options={{
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Month",
                          font: {
                            family: "arial",
                          },
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Count",
                        },
                      },
                    },
                    backgroundColor: "#FFFFFF",
                    plugins: {
                      legend: {
                        display: true,
                      },
                    },
                  }}
                />
              </div>
              <div className="chart-container">
                <h4>Appointment Counts by Service Type</h4>
                <Bar
                  data={barData}
                  className="chart"
                  options={{
                    scales: {
                      x: {
                        title: {
                          display: true,
                          text: "Services",
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: "Count",
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        display: true,
                      },
                    },
                  }}
                  suppressContentEditableWarning
                />
              </div>
            </div>
            <div className="chart-row">
              <div className="chart-container">
                <h4>Booking Status Distribution</h4>
                <Pie
                  data={pieData}
                  className="chart"
                  options={{
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                      },
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
              </div>
              <div className="chart-container">
                <h4>Current Booking Status Breakdown</h4>
                <Doughnut
                  data={doughnutData}
                  className="chart"
                  options={{
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                      },
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
              </div>
            </div>

            {/* ... Other content ... */}
          </div>
        </div>
      </Container>
    </BannerArea>
  );
};

export default HeroContentDashboard;
