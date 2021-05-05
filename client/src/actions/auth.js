import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signup = (form) => async (dispatch) => {
  try {
    //sign up the user
    window.location.href = `../`;
  } catch (error) {
    console.log(error);
  }
};

export const signin = (form) => async (dispatch) => {
  try {
    //sign in the user
    window.location.href = `../`;
  } catch (error) {
    console.log(error);
  }
};
