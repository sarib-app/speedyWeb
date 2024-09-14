import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import styles from "./GooglePlacesAutocompleteComponent.module.css";

import { useDispatch } from "react-redux";
import {
  setBusinessName,
  setAddress1,
  setAddress2,
  setAddress3,
  setCity,
  setState,
  setCountry,
  setZipcode,
  setPhone,
} from "store/businessSlice";

export default function GooglePlacesAutocompleteComponent() {
  let searchBox = null;
  const dispatch = useDispatch();
  const API_KEY = "AIzaSyA0lolNAdaUEWUslsIPxKajib9p0kToU1U";

  const handleChange = (field, value) => {
    switch (field) {
      case "businessName":
        dispatch(setBusinessName(value));
        break;
      case "address1":
        dispatch(setAddress1(value));
        break;
      case "address2":
        dispatch(setAddress2(value));
        break;
      case "address3":
        dispatch(setAddress3(value));
        break;
      case "city":
        dispatch(setCity(value));
        break;
      case "state":
        dispatch(setState(value));
        break;
      case "country":
        dispatch(setCountry(value));
        break;
      case "zipcode":
        dispatch(setZipcode(value));
        break;
      case "phone":
        dispatch(setPhone(value));
        break;
      default:
        break;
    }
  };

  const onLoad = (ref) => {
    searchBox = ref;
    "SearchBox loaded:", searchBox;
  };
  const onPlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      places;
      if (places.length > 0) {
        const addressComponents = places[0].address_components;
        handleChange("businessName", places[0].name);
        handleChange("phone", places[0].formatted_phone_number);
        // Initialize an array to store the extracted values
        const extractedValues = [];

        // Extract values at positions 0-7 and store them in address 1, 2, etc.
        for (let i = 0; i < 8; i++) {
          if (addressComponents[i]) {
            extractedValues[i + 1] = addressComponents[i].short_name;
            addressComponents[i].short_name;
          }
        }

        // Call the handleChange method to update the parent component's state
        handleChange("address1", extractedValues[2]);
        handleChange("address2", extractedValues[3]);
        handleChange("address3", extractedValues[1]);
        handleChange("city", extractedValues[4]);
        handleChange("state", extractedValues[6]);
        handleChange("country", extractedValues[7]);
        handleChange("zipcode", extractedValues[8]);
        // ...other fielzipcodeds
      } else {
        console.error("No places found.");
      }
    } else {
      console.error("SearchBox is not loaded yet.");
    }
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
      <div className={styles.suggestionsContainer}>
        <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
          <input
            type="text"
            placeholder="Search your business"
            className={styles.searchInput}
          />
          {/* Here, add a container for suggestions and style each suggestion using the .suggestion class */}
        </StandaloneSearchBox>
      </div>
    </LoadScript>
  );
}
