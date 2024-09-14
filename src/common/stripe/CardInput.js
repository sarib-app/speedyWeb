import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "white", // Ensures the background matches other inputs
    "&:hover": {
      borderColor: "#888",
    },
    fontSize: "16px",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: "1.4375em",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)", // Optional: adds subtle inner shadow similar to other inputs
  },
});

export default function CardInput() {
  const classes = useStyles();
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#000",
        fontSize: "16px",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        "::placeholder": {
          color: "#aab7c4",
        },
        backgroundColor: "white", // Ensures the input background is white
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    classes: {
      base: classes.root,
    },
  };

  return <CardElement options={CARD_ELEMENT_OPTIONS} />;
}
