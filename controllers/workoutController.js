const { default: mongoose } = require("mongoose");
const Workout = require("../models/workoutModel");

// get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single workout
const getSingleWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout / wrong id" });
    }
    const workOut = await Workout.findById(id);
    if (!workOut) {
      return res.status(404).json({ error: "No such workout found" });
    }
    res.status(200).json(workOut);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  // add doc to db
  try {
    //sends the data to the mongodb
    const workout = await Workout.create({ title, load, reps });
    //returns a success message along with the created object
    res.status(200).json(workout);
  } catch (error) {
    //returns the error message back to the frontend
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "the provided id is not valid" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res
      .status(404)
      .json({ error: "there is not workout found to be deleted" });
  }
  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "the provided id is not valid" });
  }
  const workOut = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!workOut) {
    return res.status(404).json({ error: "No such workout found to patch" });
  }
  res.status(200).json(workOut);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
