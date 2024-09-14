import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import styles from "./GooglePlacesAutocompleteComponent.module.css";

import { useDispatch } from "react-redux";
import { useState } from "react";
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
  const [noResultsFound, setNoResultsFound] = useState(false);
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
      if (places?.length > 0) {
        const addressComponents = places[0].address_components;
        setNoResultsFound(false);
        // Map business name
        handleChange("businessName", places[0].name);

        // Map address components dynamically based on their types
        handleChange("phone", places[0].formatted_phone_number);
        handleChange(
          "address1",
          getAddressComponent(addressComponents, "street_number")?.short_name ||
            ""
        );
        handleChange(
          "address2",
          getAddressComponent(addressComponents, "route")?.short_name || ""
        );
        handleChange(
          "address3",
          getAddressComponent(addressComponents, "subpremise")?.short_name || ""
        );
        handleChange(
          "city",
          getAddressComponent(addressComponents, "locality")?.short_name || ""
        );
        handleChange(
          "state",
          getAddressComponent(addressComponents, "administrative_area_level_1")
            ?.short_name || ""
        );
        handleChange(
          "country",
          getAddressComponent(addressComponents, "country")?.short_name || ""
        );
        handleChange(
          "zipcode",
          getAddressComponent(addressComponents, "postal_code")?.short_name ||
            ""
        );
        // ...other fields
      } else {
        setNoResultsFound(true);
        console.error("No places found.");
      }
    } else {
      console.error("SearchBox is not loaded yet.");
    }
  };

  const getAddressComponent = (addressComponents, type) => {
    return addressComponents.find((component) =>
      component.types.includes(type)
    );
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
      <div className={styles.suggestionsContainer}>
        {noResultsFound && (
          <div className={styles.errorMessage}>
            Please try manually if you are not able to find your business.
          </div>
        )}
        <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
          <input
            type="text"
            placeholder="Search your address"
            className={styles.searchInput}
          />
        </StandaloneSearchBox>

        {/* Here, add a container for suggestions and style each suggestion using the .suggestion class */}
      </div>
    </LoadScript>
  );
}
