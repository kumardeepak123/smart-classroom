import React from "react";
import Layout from "./hoc/layout/layout";
import {BrowserRouter ,Switch ,Route} from 'react-router-dom'
import HomePage from "./components/Home";
import SignUp from "./components/Signup";

const Routes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/home" component={HomePage} />
          <Route path="/Signup" component={SignUp} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
