import React from "react";
import { AddressElement } from "@stripe/react-stripe-js";
const appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#ed5f74",
    borderRadius: "40px",
    fontFamily:
      "--body-font-family: -apple-system, BlinkMacSystemFont, sans-serif",
    colorBackground: "#fafafa",
  },
};
const ADDRESS_ELEMENT_OPTIONS = {
  variables: {
    colorPrimary: "#0570de",
    colorBackground: "#ffffff",
    colorText: "#30313d",
    colorDanger: "#df1b41",
    fontFamily: "Ideal Sans, system-ui, sans-serif",
    spacingUnit: "2px",
    borderRadius: "40px",
    // Ensure these variable names are supported by Stripe's current API
  },
  mode: "billing",
  allowedCountries: ["US"],
  autocomplete: {
    mode: "google_maps_api",
    apiKey: "AIzaSyA0lolNAdaUEWUslsIPxKajib9p0kToU1U",
  },
};

export default function AddressInput() {
  return (
    <AddressElement options={ADDRESS_ELEMENT_OPTIONS} appearance={appearance} />
  );
}
