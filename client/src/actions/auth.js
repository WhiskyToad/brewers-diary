import { AUTH } from "../constants/actionTypes";
import * as api from "../api/beer/recipes";

export const signin = (form, router) => async (dispatch) => {
  try {
    const { data } = await api.signin(form);
    dispatch({ type: AUTH, data });
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (form, router) => async (dispatch) => {
  try {
    const { data } = await api.signup(form);
    dispatch({ type: AUTH, data });
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
