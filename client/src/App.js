import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import Recipes from "./components/Beer/Recipes/List";
import RecipeView from "./components/Beer/Recipes/View";
import Auth from "./components/Auth/Auth";
import FourOhFour from "./components/FourOhFour";
import CreateRecipe from "./Pages/CreateRecipe";
import EditRecipe from "./Pages/EditRecipe";

import theme from "./theme/theme";
import Fonts from "./theme/font-face";
import "./styles.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <Fonts />
          <div className="wrapper">
            <NavBar />
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Redirect to="/recipes" />}
              />

              <Route exact path="/recipes" component={Recipes} />
              <Route exact path="/recipe/create" component={CreateRecipe} />
              <Route exact path="/recipe/edit" component={EditRecipe} />
              <Route exact path="/recipes/view" component={RecipeView} />
              <Route exact path="/auth" component={Auth} />
              <Route component={FourOhFour} />
            </Switch>
          </div>
          <Footer />
        </ChakraProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
