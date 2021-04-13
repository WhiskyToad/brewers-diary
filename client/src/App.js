import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import NavBar from "./components/NavBar";
import { getRecipes } from "./actions/recipes";
import Home from "./components/Home";
import Recipes from "./components/Recipes/Recipes";
import RecipeForm from "./components/Recipes/Form/RecipeForm";
import RecipeView from "./components/Recipes/RecipeView";
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
            <Route component={FourOhFour} />
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
};

export default App;
