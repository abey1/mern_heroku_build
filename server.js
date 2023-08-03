const cors = require("cors");

require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const workoutRoute = require("./routes/workouts");

// express app
const app = express();

// enforcing cors policies
app.use(cors());

// allows req to be sent from frontend
app.use(express.json());

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoute);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //script for heroku
    if (process.env.NODE_ENV === "production") {
      app.use(express.static("frontend/build"));
      app.get("*", (req, res) => {
        res.sendFile(
          path.resolve(__dirname, "frontend", "build", "index.html")
        );
      });
    }
    // listen for requests
    app.listen(process.env.PORT || 4000, () => {
      console.log("connected to DB & listening on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
