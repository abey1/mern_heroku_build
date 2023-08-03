import React, { useEffect, useState } from "react";
import {
  BACKEND_API_LOCATION,
  HIDE_MODAL,
  DELETE_LOCAL_DATA,
} from "../utils/Constants";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../context/WorkoutContext";

const Home = () => {
  const { dispatch, show_modal, del_single_workout, workouts } =
    useWorkoutContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${BACKEND_API_LOCATION}/api/workouts/`);
        const json = await response.json();
        if (response.ok) {
          console.log(json);
          dispatch({ type: "SET_WORKOUTS", payload: json });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorkouts();
  }, []);

  const hideModal = () => {
    dispatch({ type: HIDE_MODAL });
  };

  const handleDelete = async () => {
    const result = await fetch(
      `${BACKEND_API_LOCATION}/api/workouts/${del_single_workout._id}`,
      {
        method: "DELETE",
      }
    );
    dispatch({ type: DELETE_LOCAL_DATA });
    console.log(result);
    hideModal();
  };
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout, index) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
      {show_modal && (
        <div className="delete_modal_container">
          <div className="delete_modal">
            <h5>{del_single_workout._id}</h5>
            <h3>
              are you sure you want to delete [ {del_single_workout.title} ]
            </h3>
            <div className="delete_modal_btn_container">
              <button className="btn yes" onClick={handleDelete}>
                yes
              </button>
              <button className="btn no" onClick={hideModal}>
                no
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
