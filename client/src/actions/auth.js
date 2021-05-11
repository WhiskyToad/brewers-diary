import { AUTH } from "../constants/actionTypes";
import * as api from "../api/beer/recipes";

export const signin = (form) => async (dispatch) => {
  try {
    const { data } = await api.signin(form);
    dispatch({ type: AUTH, data });
    window.location.href = `../`;
  } catch (error) {
    console.log(error);
  }
};

export const signup = (form) => async (dispatch) => {
  try {
    const { data } = await api.signup(form);
    dispatch({ type: AUTH, data });
    window.location.href = `../`;
  } catch (error) {
    console.log(error);
  }
};
