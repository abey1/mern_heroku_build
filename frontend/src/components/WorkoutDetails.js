import React from "react";
import { Link } from "react-router-dom";
import {
  SET_TITLE,
  SET_LOAD,
  SET_REPS,
  SET_EDIT,
  SET_WORKOUT,
  SHOW_MODAL,
} from "../utils/Constants";
import { useWorkoutContext } from "../context/WorkoutContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();

  const handleEdit = () => {
    dispatch({ type: SET_TITLE, payload: workout.title });
    dispatch({ type: SET_LOAD, payload: workout.load });
    dispatch({ type: SET_REPS, payload: workout.reps });
    dispatch({ type: SET_EDIT, payload: true });
    dispatch({ type: SET_WORKOUT, payload: workout });
    console.log(workout);
  };
  const showModal = () => {
    dispatch({ type: SHOW_MODAL, payload: workout });
  };
  return (
    <div className="workout-details">
      <div className="left">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (Kg):</strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps :</strong>
          {workout.reps}
        </p>
        <p>{workout.createdAt}</p>
      </div>
      <div className="right">
        <div className="delete" onClick={showModal}>
          DELETE
        </div>

        <div className="edit" onClick={handleEdit}>
          EDIT
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails;
