const mongoose = require("mongoose");


mongoose
  .connect("mongodb://localhost:27017/registrationForm", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Succesfull !!!");
  })
  .catch((e) => {
    console.log("Connection Error" + e);
  });
