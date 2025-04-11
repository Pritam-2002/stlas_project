const mongoose = require("mongoose");
export const eroorHnadler = (eroor: unknown) => {
  if (eroor instanceof Error) {
    console.error("❌ Error:", eroor.message);
  } else {
    console.error("❌ An unknown error occurred");
  }
};
