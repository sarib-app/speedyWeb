import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaCopy,
  FaEnvelope,
} from "react-icons/fa";
import Confetti from "react-confetti";
import { createEarlySubscriber } from "common/api/api";

const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);

const data = [
  {
    option: "1 Month",
    style: { backgroundColor: "#f9ab55", textColor: "#084887" },
  },
  {
    option: "2 Months",
    style: { backgroundColor: "#084887", textColor: "#f9ab55" },
  },
  {
    option: "3 Months",
    style: { backgroundColor: "#f9ab55", textColor: "#084887" },
  },
  {
    option: "4 Months",
    style: { backgroundColor: "#084887", textColor: "#f9ab55" },
  },
  {
    option: "5 Months",
    style: { backgroundColor: "#f9ab55", textColor: "#084887" },
  },
  {
    option: "6 Months",
    style: { backgroundColor: "#084887", textColor: "#f9ab55" },
  },
];

const CountdownScreen = ({ launchDate, onCountdownComplete }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(launchDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({});
  const [selectedPrize, setSelectedPrize] = useState("");
  const [businessDetails, setBusinessDetails] = useState({
    businessName: "",
    contactName: "",
    contactEmail: "",
    phone: "",
    website: "",
    bestTimeToContact: "morning",
  });
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [spinDisabled, setSpinDisabled] = useState(false);
  const [isPrizeClaimed, setIsPrizeClaimed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const shareText = `
  🚀 Attention Business Owners! 🚀

  Tired of being weighed down by platform fees and costly ads? Say goodbye to extra charges for premium features and hello to SpeedySlotz! We're offering up to 6 months FREE subscription to boost your business like never before. 💼✨
  
  Why Choose SpeedySlotz?
  
  💸 Fixed Subscription: Simplify your expenses with one clear, affordable rate.
  🌟 Performance-Based Success: Shine based on your excellent service, not just ratings.
  🤖 Smart Lead Distribution: Let our intelligent algorithm send leads your way automatically.
  🏅 Earn Your Place: Gain badges and climb to the top of the list.
  🔥 No Premium Fees: Unlock all features without the added costs.
  🚀 Direct Client Interaction: Connect directly with clients, eliminating the middleman.
  🔑 Join the revolution today and take control of your business destiny with SpeedySlotz!
  
  👉 Sign up now: https://speedyslotz.com 👈
  `;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isMounted) {
        const newTimeLeft = calculateTimeLeft();
        setTimeLeft(newTimeLeft);

        if (Object.values(newTimeLeft).every((val) => val <= 0)) {
          clearInterval(timer);
          onCountdownComplete();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate, isMounted]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stylesSheet = document.styleSheets[0];

      const keyframesFadeIn = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;

      const keyframesSlideIn = `
        @keyframes slideIn {
          from { transform: translateY(-30px); }
          to { transform: translateY(0); }
        }
      `;

      const keyframesPulse = `
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `;

      const keyframesFloatLogo = `
        @keyframes floatLogo {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }
      `;

      const keyframesBounce = `
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-5px); }
        }
      `;

      stylesSheet.insertRule(keyframesFadeIn, stylesSheet.cssRules.length);
      stylesSheet.insertRule(keyframesSlideIn, stylesSheet.cssRules.length);
      stylesSheet.insertRule(keyframesPulse, stylesSheet.cssRules.length);
      stylesSheet.insertRule(keyframesFloatLogo, stylesSheet.cssRules.length);
      stylesSheet.insertRule(keyframesBounce, stylesSheet.cssRules.length);
    }
  }, []);

  const handleSpin = () => {
    if (spinDisabled) {
      setMessage("You can only spin the wheel once.");
      setMessageType("error");
      return;
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    setPrizeIndex(randomIndex);
    setMustSpin(true);
    setSpinDisabled(true);
    setMessage("");
  };

  const handleClaim = async (event) => {
    event.preventDefault();

    const earlySubscriberData = {
      businessName: businessDetails.businessName,
      contactPersonName: businessDetails.contactName,
      contactEmailAddress: businessDetails.contactEmail,
      phoneNumber: businessDetails.phone,
      businessWebsite: businessDetails.website,
      preferredContactTime: businessDetails.bestTimeToContact,
      isRegisteredBusiness: false,
      monthsFree: parseInt(selectedPrize.split(" ")[0]),
    };

    try {
      const response = await createEarlySubscriber(earlySubscriberData);

      if (response.success) {
        if (response.warnings && response.warnings.length > 0) {
          setMessage(
            `Operation successful with warnings: ${response.warnings.join(
              ", "
            )}`
          );
          setMessageType("warning");
        } else {
          setMessage("Subscription successful! Enjoy your free subscription.");
          setMessageType("success");
          setIsPrizeClaimed(true);
          setShowConfetti(true);
        }
      } else {
        setMessage(response.message || "An error occurred.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error claiming subscription:", error);

      if (error.response) {
        setMessage(
          error.response.data.message ||
            "Could not create early subscriber. Please try again later."
        );
        setMessageType("error");
      } else {
        setMessage(
          "Could not create early subscriber. Please try again later."
        );
        setMessageType("error");
      }
    }
  };

  const handleBusinessDetailsChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails({ ...businessDetails, [name]: value });
  };

  const timerComponents = Object.keys(timeLeft).map((interval, index) => (
    <div key={index} style={styles.timeBlock}>
      <span style={styles.timeValue}>{timeLeft[interval]}</span>
      <span style={styles.timeLabel}>{interval}</span>
    </div>
  ));

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareText).then(
      () => {
        alert("Promotion text copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoTop}>
        <img
          src="/assets/images/logo_transparent-1.png"
          alt="SpeedySlotz Logo"
          style={styles.logo}
        />
      </div>

      <div style={styles.content}>
        <h1 style={styles.title}>Beta Launching Soon!</h1>
        <div style={styles.timerContainer}>
          {isMounted && timerComponents.length ? (
            timerComponents
          ) : (
            <span style={styles.timeUp}>Time's up!</span>
          )}
        </div>
      </div>

      <div style={styles.mainContent}>
        {!showForm && !isPrizeClaimed && (
          <div style={styles.wheelContainer}>
            <p style={styles.promotionalText}>
              Spin to win up to 6 months free subscription!
            </p>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeIndex}
              data={data}
              backgroundColors={["#f9ab55", "#084887"]}
              textColors={["#084887", "#f9ab55"]}
              onStopSpinning={() => {
                setMustSpin(false);
                setSelectedPrize(data[prizeIndex].option);
                setShowConfetti(true);
              }}
              spinDuration={0.5}
            />
            {!mustSpin && !selectedPrize && (
              <button
                style={styles.spinButton}
                onClick={handleSpin}
                disabled={spinDisabled}
              >
                Spin the Wheel
              </button>
            )}
            {mustSpin && <p style={styles.spinningText}>Spinning...</p>}
            {selectedPrize && (
              <div style={styles.prizeContainer}>
                {showConfetti && (
                  <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                  />
                )}
                <p style={styles.prizeText}>
                  You won: {selectedPrize} Free Subscription!
                </p>
                <button
                  style={styles.claimButton}
                  onClick={() => setShowForm(true)}
                >
                  Claim {selectedPrize}
                </button>
              </div>
            )}
          </div>
        )}

        {showForm && !isPrizeClaimed && (
          <div style={styles.formContainer}>
            <h2 style={styles.successTitle}>Claim Your Prize</h2>
            <p style={styles.successText}>
              You won: {selectedPrize} Free Subscription!
            </p>
            <p style={styles.successText}>
              Provide your business details to register.
            </p>
            <form onSubmit={handleClaim}>
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={businessDetails.businessName}
                onChange={handleBusinessDetailsChange}
                style={styles.inputField}
                required
              />
              <input
                type="text"
                name="contactName"
                placeholder="Contact Name"
                value={businessDetails.contactName}
                onChange={handleBusinessDetailsChange}
                style={styles.inputField}
                required
              />
              <input
                type="email"
                name="contactEmail"
                placeholder="Contact Email"
                value={businessDetails.contactEmail}
                onChange={handleBusinessDetailsChange}
                style={styles.inputField}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={businessDetails.phone}
                onChange={handleBusinessDetailsChange}
                style={styles.inputField}
                required
              />
              <input
                type="text"
                name="website"
                placeholder="Business Website"
                value={businessDetails.website}
                onChange={handleBusinessDetailsChange}
                style={styles.inputField}
                required
              />
              <select
                name="bestTimeToContact"
                value={businessDetails.bestTimeToContact}
                onChange={handleBusinessDetailsChange}
                style={styles.inputField}
                required
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="anytime">Anytime</option>
              </select>
              <button type="submit" style={styles.submitButton}>
                Subscribe
              </button>
            </form>

            {message && (
              <div
                style={{
                  ...styles.message,
                  ...(messageType === "error"
                    ? styles.error
                    : messageType === "success"
                    ? styles.success
                    : styles.warning),
                }}
              >
                {message}
              </div>
            )}
          </div>
        )}

        {isPrizeClaimed && (
          <div style={styles.successMessageContainer}>
            <div style={styles.successHeader}>
              <h2 style={styles.successTitle}>Congratulations!</h2>
              <h4 style={styles.subTitle}>
                Your {selectedPrize} Free Subscription will be applied to your
                account!
              </h4>
            </div>
            <div style={styles.successContent}>
              <p style={styles.successText}>
                Welcome to the SpeedySlotz community! Your free subscription has
                been successfully activated. Our team will contact you shortly
                to assist you with getting started. In the meantime, feel free
                to reach out to us if you have any questions at{" "}
                <a
                  href="mailto:contact@speedyslotz.com"
                  style={styles.emailLink}
                >
                  contact@speedyslotz.com
                </a>
              </p>
            </div>

            <div style={styles.highlightSection}>
              <h3 style={styles.highlightTitle}>Share the News!</h3>
              <p style={styles.highlightText}>
                As part of our exclusive pre-launch offer, service professionals
                can enjoy unique benefits. Spread the word and let your network
                seize this limited-time opportunity before we officially launch!
              </p>
              <div style={styles.socialIcons}>
                <div style={styles.iconContainer}>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      "https://speedyslotz.com"
                    )}&quote=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook style={styles.icon} />
                  </a>
                  <span style={styles.iconText}>Share on Facebook</span>
                </div>
                <div style={styles.iconContainer}>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      shareText
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp style={styles.icon} />
                  </a>
                  <span style={styles.iconText}>Share on WhatsApp</span>
                </div>
                <div style={styles.iconContainer}>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      shareText
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter style={styles.icon} />
                  </a>
                  <span style={styles.iconText}>Tweet</span>
                </div>
                <div style={styles.iconContainer}>
                  <a
                    href="https://www.instagram.com/speedyslotz"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram style={styles.icon} />
                  </a>
                  <span style={styles.iconText}>Visit Instagram</span>
                </div>
                <div
                  style={styles.iconContainer}
                  onClick={handleCopyToClipboard}
                >
                  <FaCopy style={styles.icon} />
                  <span style={styles.iconText}>Copy to Clipboard</span>
                </div>
                <div style={styles.iconContainer}>
                  <a
                    href={`mailto:?subject=Join SpeedySlotz!&body=${encodeURIComponent(
                      shareText
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaEnvelope style={styles.icon} />
                  </a>
                  <span style={styles.iconText}>Email</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={styles.footer}>
        <div style={styles.contactDetails}>
          <p style={styles.contactText}>Follow us on</p>
        </div>
        <div style={styles.socialIcons}>
          <div style={styles.iconContainer}>
            <a
              href="https://www.facebook.com/speedyslotz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook style={styles.icon} />
            </a>
            <span style={styles.iconText}>Facebook</span>
          </div>
          <div style={styles.iconContainer}>
            <a
              href="https://twitter.com/speedyslotz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter style={styles.icon} />
            </a>
            <span style={styles.iconText}>Twitter</span>
          </div>
          <div style={styles.iconContainer}>
            <a
              href="https://www.instagram.com/speedyslotz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram style={styles.icon} />
            </a>
            <span style={styles.iconText}>Instagram</span>
          </div>
        </div>
        <p style={styles.copyright}>
          &copy; {new Date().getFullYear()} SpeedySlotz. All rights reserved.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#f9ab55",
    padding: "20px",
    overflow: "hidden",
    position: "relative",
    width: "100%",
    "@media (max-width: 768px)": {
      padding: "10px",
      paddingTop: "80px",
    },
  },
  logoTop: {
    position: "absolute",
    top: "20px",
    left: "20px",
    "@media (max-width: 768px)": {
      top: "10px",
      left: "10px",
    },
  },
  logo: {
    width: "120px",
    height: "auto",
    "@media (max-width: 768px)": {
      width: "80px",
    },
  },
  content: {
    maxWidth: "600px",
    textAlign: "center",
    color: "#084887",
    animation: "fadeIn 1s ease-in-out",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    marginTop: "100px",
    "@media (max-width: 768px)": {
      gap: "15px",
      marginTop: "70px",
      width: "100%", // Ensure content fits within screen
    },
  },
  title: {
    fontSize: "2rem",
    margin: "20px",
    color: "#084887",
    animation: "slideIn 1s ease-out",
    "@media (max-width: 768px)": {
      fontSize: "1.4rem",
    },
  },
  promotionalText: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#084887",
    marginBottom: "20px",
    textAlign: "center",
    "@media (max-width: 768px)": {
      fontSize: "1rem",
      padding: "0 10px",
    },
  },
  timerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "40px",
    animation: "pulse 2s infinite",
    "@media (max-width: 768px)": {
      gap: "5px",
      width: "100%",
    },
  },
  timeBlock: {
    backgroundColor: "#084887",
    borderRadius: "10px",
    padding: "5px 10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    animation: "bounce 2s ease-in-out infinite alternate",
    "@media (max-width: 768px)": {
      padding: "4px 6px",
    },
  },
  timeValue: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#f9ab55",
    "@media (max-width: 768px)": {
      fontSize: "0.9rem",
    },
  },
  timeLabel: {
    fontSize: "0.7rem",
    fontWeight: "normal",
    color: "#f9ab55",
    "@media (max-width: 768px)": {
      fontSize: "0.6rem",
    },
  },
  timeUp: {
    fontSize: "2rem",
    color: "#084887",
    "@media (max-width: 768px)": {
      fontSize: "1.5rem",
    },
  },
  wheelContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "40px",
    justifyContent: "center",
    height: "calc(100vh - 450px)",
    "@media (max-width: 768px)": {
      height: "auto",
      width: "100%",
    },
  },
  spinButton: {
    backgroundColor: "#084887",
    color: "#f9ab55",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",
    marginTop: "15px",
    marginBottom: "70px",
    "@media (max-width: 768px)": {
      fontSize: "0.9rem",
      padding: "12px 16px",
      marginBottom: "50px",
    },
  },
  prizeContainer: {
    textAlign: "center",
    marginTop: "15px",
    width: "100%", // Ensure container fits within screen
  },
  prizeText: {
    marginTop: "10px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#084887",
    "@media (max-width: 768px)": {
      fontSize: "1rem",
    },
  },
  spinningText: {
    fontSize: "1.2rem",
    color: "#084887",
    marginTop: "10px",
    "@media (max-width: 768px)": {
      fontSize: "1rem",
    },
  },
  formContainer: {
    backgroundColor: "#fff5e5",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    "@media (max-width: 768px)": {
      padding: "15px",
      width: "100%",
    },
  },
  inputField: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    fontSize: "1rem",
    width: "100%",
    boxSizing: "border-box",
    "@media (max-width: 768px)": {
      padding: "8px",
    },
  },
  successMessageContainer: {
    backgroundColor: "#fff5e5",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    maxWidth: "700px",
    margin: "0 auto",
    "@media (max-width: 768px)": {
      padding: "20px",
      width: "100%",
    },
  },
  successHeader: {
    borderBottom: "2px solid #084887",
    paddingBottom: "10px",
    marginBottom: "20px",
  },
  successTitle: {
    fontSize: "1.8rem",
    margin: "0",
    color: "#084887",
    "@media (max-width: 768px)": {
      fontSize: "1.5rem",
    },
  },
  subTitle: {
    fontSize: "1.2rem",
    margin: "10px 0",
    color: "#084887",
    "@media (max-width: 768px)": {
      fontSize: "1rem",
    },
  },
  successContent: {
    fontSize: "1rem",
    color: "#084887",
    marginBottom: "20px",
    lineHeight: "1.6",
    "@media (max-width: 768px)": {
      fontSize: "0.9rem",
    },
  },
  successText: {
    marginBottom: "10px",
  },
  highlightSection: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#e6f2ff",
    borderRadius: "10px",
    "@media (max-width: 768px)": {
      marginTop: "20px",
      padding: "15px",
      width: "100%",
    },
  },
  highlightTitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    color: "#084887",
    "@media (max-width: 768px)": {
      fontSize: "1.2rem",
    },
  },
  highlightText: {
    fontSize: "1rem",
    color: "#084887",
    lineHeight: "1.6",
    "@media (max-width: 768px)": {
      fontSize: "0.9rem",
    },
  },
  socialSection: {
    borderTop: "2px solid #084887",
    paddingTop: "20px",
  },
  shareButton: {
    backgroundColor: "#084887",
    color: "#f9ab55",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginBottom: "10px",
    transition: "background-color 0.3s ease",
    "@media (max-width: 768px)": {
      fontSize: "0.9rem",
      padding: "8px 16px",
    },
  },
  footer: {
    marginTop: "auto",
    textAlign: "center",
    color: "#084887",
    width: "100%",
    paddingTop: "40px",
    paddingBottom: "30px",
    "@media (max-width: 768px)": {
      paddingBottom: "40px",
    },
  },
  contactDetails: {
    marginBottom: "10px",
  },
  contactText: {
    margin: 0,
    fontSize: "1rem",
    "@media (max-width: 768px)": {
      fontSize: "0.9rem",
    },
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    marginTop: "10px",
    "@media (max-width: 768px)": {
      gap: "5px",
      width: "100%",
    },
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: "5px",
    "@media (max-width: 768px)": {
      padding: "2px",
    },
  },
  icon: {
    fontSize: "2rem",
    color: "#084887",
    cursor: "pointer",
    transition: "color 0.3s ease",
    "@media (max-width: 768px)": {
      fontSize: "1.4rem",
    },
  },
  iconText: {
    fontSize: "0.9rem",
    color: "#084887",
    opacity: 0,
    position: "absolute",
    bottom: "-20px",
    whiteSpace: "nowrap",
    transition: "opacity 0.3s ease",
    "@media (max-width: 768px)": {
      fontSize: "0.7rem",
    },
  },
  iconContainerHovered: {
    "&:hover $iconText": {
      opacity: 1,
    },
  },
  socialConnectSection: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    "@media (max-width: 768px)": {
      marginTop: "20px",
      padding: "15px",
      width: "100%",
    },
  },
  connectTitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    color: "#084887",
    "@media (max-width: 768px)": {
      fontSize: "1.2rem",
    },
  },
  connectText: {
    fontSize: "1rem",
    color: "#084887",
    lineHeight: "1.6",
    "@media (max-width: 768px)": {
      fontSize: "0.9rem",
    },
  },
  copyright: {
    fontSize: "0.9rem",
    color: "#084887",
    "@media (max-width: 768px)": {
      fontSize: "0.8rem",
    },
  },
  message: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    textAlign: "center",
    fontSize: "0.9rem",
    width: "100%",
    boxSizing: "border-box",
    "@media (max-width: 768px)": {
      fontSize: "0.8rem",
      padding: "8px",
    },
  },
  error: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
  },
  success: {
    backgroundColor: "#d4edda",
    color: "#155724",
  },
  warning: {
    backgroundColor: "#fff3cd",
    color: "#856404",
  },
};

export default CountdownScreen;
