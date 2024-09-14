import React, { useEffect, useRef } from "react";

const GoogleMaps = ({ onZipCodeSelected, centerZipcode }) => {
  const mapRef = useRef(null);

  const customStyles = [
    // Landscapes
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#ebe3cd" }],
    },
    // Points of Interest
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    // Points of Interest - Business
    {
      featureType: "poi.business",
      elementType: "labels.text.fill",
      stylers: [{ color: "#8a8a8a" }],
    },
    // Roads
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#f5f1e6" }],
    },
    // Roads - Highways
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#f8c967" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#e9bc62" }],
    },
    // Roads - Arterial
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#fdfcf8" }],
    },
    // Roads - Local
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#7b7b7b" }],
    },
    // Transit
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#dfd2ae" }],
    },
    // Water
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#b9d3c2" }],
    },
    // Administrative - Labels
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ color: "#444444" }],
    },
    // Administrative - Boundaries
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [{ color: "#4b6878" }],
    },
    // Additional styles for other features...
  ];

  useEffect(() => {
    const initMap = (position) => {
      const { latitude, longitude } = position.coords;
      const initialCenter = { lat: latitude, lng: longitude };

      const googleMap = new window.google.maps.Map(mapRef.current, {
        zoom: 12, // Adjusted for city-level detail
        center: initialCenter,
        styles: customStyles, // Apply custom styles to the map
      });
      const infoWin = new window.google.maps.InfoWindow();

      googleMap.addListener("click", (e) => onMapClick(e, infoWin, googleMap));
    };

    const onMapClick = (e, infoWin, googleMap) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: e.latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          const addressComponents = results[0].address_components;
          const zipComponent = addressComponents.find((component) =>
            component.types.includes("postal_code")
          );
          if (zipComponent) {
            const zipCode = zipComponent.long_name;
            infoWin.setContent(`Zip Code: ${zipCode}`);
            infoWin.setPosition(e.latLng);
            infoWin.open(googleMap);
            onZipCodeSelected(zipCode);
          } else {
            ("This location does not have an associated zip code.");
          }
        } else {
          console.error("Geocoder failed due to: " + status);
        }
      });
    };

    const loadMapWithCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          initMap,
          () => {
            // Fallback if user denies geolocation permission
            initMap({ coords: { latitude: 37.7749, longitude: -122.4194 } }); // Default to San Francisco
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        ("Geolocation is not supported by this browser.");
        initMap({ coords: { latitude: 37.7749, longitude: -122.4194 } }); // Default to San Francisco
      }
    };

    const centerMapOnZipcode = (zipcode) => {
      if (!window.google) return;

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: zipcode }, (results, status) => {
        if (status === "OK" && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          const center = { lat: lat(), lng: lng() };
          const googleMap = new window.google.maps.Map(mapRef.current, {
            zoom: 12,
            center,
            styles: customStyles,
          });
          const infoWin = new window.google.maps.InfoWindow();
          googleMap.addListener("click", (e) =>
            onMapClick(e, infoWin, googleMap)
          );
        } else {
          console.error(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA0lolNAdaUEWUslsIPxKajib9p0kToU1U&callback=initGoogleMaps`;
      script.async = true;
      document.head.appendChild(script);
      window.initGoogleMaps = () => {
        loadMapWithCurrentLocation();
        if (centerZipcode) {
          centerMapOnZipcode(centerZipcode);
        }
      };
    } else {
      loadMapWithCurrentLocation();
      if (centerZipcode) {
        centerMapOnZipcode(centerZipcode);
      }
    }
  }, [centerZipcode]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default GoogleMaps;
