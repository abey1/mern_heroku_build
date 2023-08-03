import { createContext, useContext } from "react";
import { useReducer } from "react";
import {
  SET_WORKOUTS,
  CREATE_WORKOUT,
  SET_TITLE,
  SET_LOAD,
  SET_REPS,
  SET_ERROR,
  SET_EDIT,
  SET_WORKOUT,
  UPDATE_LOCAL_DATA,
  SHOW_MODAL,
  HIDE_MODAL,
  DELETE_LOCAL_DATA,
} from "../utils/Constants";

const WorkoutContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WORKOUTS:
      return { ...state, workouts: action.payload };
    case CREATE_WORKOUT:
      return { ...state, workouts: [action.payload, ...state.workouts] };
    case SET_TITLE:
      return { ...state, title: action.payload };
    case SET_LOAD:
      return { ...state, load: action.payload };
    case SET_REPS:
      return { ...state, reps: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_EDIT:
      return { ...state, edit: action.payload };
    case SET_WORKOUT:
      return { ...state, single_workout: action.payload };
    case UPDATE_LOCAL_DATA: {
      const new_workouts = state.workouts.map((workout, index) => {
        if (workout._id === action.payload.id) {
          return {
            ...workout,
            title: action.payload.title,
            load: action.payload.load,
            reps: action.payload.reps,
          };
        } else {
          return workout;
        }
      });
      return { ...state, workouts: new_workouts };
    }
    case DELETE_LOCAL_DATA: {
      const new_workouts = state.workouts.filter((workout, index) => {
        return state.del_single_workout._id != workout._id;
      });
      return { ...state, workouts: new_workouts };
    }
    case SHOW_MODAL:
      return { ...state, show_modal: true, del_single_workout: action.payload };
    case HIDE_MODAL:
      return { ...state, show_modal: false };
    default:
      return state;
  }
};

const initialState = {
  title: "",
  load: "",
  reps: "",
  single_workout: null,
  del_single_workout: null,
  error: "",
  edit: false,
  workouts: null,
  show_modal: false,
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => {
  return useContext(WorkoutContext);
};
