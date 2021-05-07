import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import NavBar from "./components/NavBar";
import { getRecipes } from "./actions/beer/recipes";
import Home from "./components/Home";
import Recipes from "./components/Beer/Recipes/List";
import RecipeForm from "./components/Beer/Recipes/Form/Index";
import RecipeView from "./components/Beer/Recipes/View";
import Auth from "./components/Auth/Auth";
import FourOhFour from "./components/FourOhFour";

import theme from "./theme/theme";
import Fonts from "./theme/font-face";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);
  return (
    <>
      <ChakraProvider theme={theme}>
        <Fonts />
        <NavBar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/recipes" component={Recipes} />
            <Route exact path="/recipe/create" component={RecipeForm} />
            <Route exact path="/recipes/view" component={RecipeView} />
            <Route exact path="/auth" component={Auth} />
            <Route component={FourOhFour} />
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
};

export default App;
