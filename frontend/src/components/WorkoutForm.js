import React from "react";
import { useWorkoutContext } from "../context/WorkoutContext";
import {
  BACKEND_API_LOCATION,
  SET_TITLE,
  SET_ERROR,
  SET_LOAD,
  SET_REPS,
  SET_EDIT,
  UPDATE_LOCAL_DATA,
} from "../utils/Constants";
const WorkoutForm = () => {
  const { title, load, reps, error, edit, single_workout, dispatch } =
    useWorkoutContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const response = await fetch(`${BACKEND_API_LOCATION}/api/workouts/`, {
      method: "POST",
      body: JSON.stringify(workout),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: SET_ERROR, payload: null });
      dispatch({ type: SET_TITLE, payload: "" });
      dispatch({ type: SET_LOAD, payload: "" });
      dispatch({ type: SET_REPS, payload: "" });
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      console.log("new workout added", json);
    } else {
      dispatch({ type: SET_ERROR, payload: json.error });
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("edited successfully");
    const new_workout = {
      title,
      load,
      reps,
    };
    const response = await fetch(
      `${BACKEND_API_LOCATION}/api/workouts/${single_workout._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(new_workout),
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response);
    console.log(single_workout);
    console.log(new_workout);
    dispatch({
      type: UPDATE_LOCAL_DATA,
      payload: { id: single_workout._id, ...new_workout },
    });
    dispatch({ type: SET_EDIT, payload: false });
    handleCancel();
  };
  const handleCancel = () => {
    dispatch({ type: SET_ERROR, payload: null });
    dispatch({ type: SET_TITLE, payload: "" });
    dispatch({ type: SET_LOAD, payload: "" });
    dispatch({ type: SET_REPS, payload: "" });
    dispatch({ type: SET_EDIT, payload: false });
  };
  return (
    <form className="create" onSubmit={edit ? handleEdit : handleSubmit}>
      <h3>Add a New Workout</h3>

      <label htmlFor="exercise_name">Exercise Title : </label>
      <input
        name="exercise_name"
        type="text"
        onChange={(e) => dispatch({ type: SET_TITLE, payload: e.target.value })}
        value={title}
        onFocus={() => dispatch({ type: SET_ERROR, payload: null })}
      />

      <label htmlFor="load_name">Load in (Kg) : </label>
      <input
        name="load_name"
        type="number"
        onChange={(e) => dispatch({ type: SET_LOAD, payload: e.target.value })}
        value={load}
        onFocus={() => dispatch({ type: SET_ERROR, payload: null })}
      />

      <label htmlFor="reps_name">Reps : </label>
      <input
        name="reps_name"
        type="number"
        onChange={(e) => dispatch({ type: SET_REPS, payload: e.target.value })}
        value={reps}
        onFocus={() => dispatch({ type: SET_ERROR, payload: null })}
      />
      <div className="form_btn_holder">
        <button type="submit">{edit ? "Edit" : "Add workout"}</button>
        {edit && (
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
