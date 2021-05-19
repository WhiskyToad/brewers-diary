import { AUTH } from "../constants/actionTypes";
import * as api from "../api/beer/recipes";

export const signin = (form, router, setError) => async (dispatch) => {
  const changeError = (error) => {
    setError(error);
  };
  try {
    const { data } = await api.signin(form);
    dispatch({ type: AUTH, data });
    router.push("/");
  } catch (error) {
    console.log(error);
    changeError(error.response.data.message);
  }
};

export const signup = (form, router, setError) => async (dispatch) => {
  const changeError = (error) => {
    setError(error);
  };

  try {
    const { data } = await api.signup(form);
    dispatch({ type: AUTH, data });
    router.push("/");
  } catch (error) {
    console.log(error);
    changeError(error.response.data.message);
  }
};
