const express = require("express");

const router = express.Router();

const {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

// get all workouts
router.get("/", getWorkouts);

// get single workout
router.get("/:id", getSingleWorkout);

// post a new workout
router.post("/", createWorkout);

// post a new workout
router.delete("/:id", deleteWorkout);

// post a new workout
router.patch("/:id", updateWorkout);

module.exports = router;
