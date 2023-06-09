import React, {useContext} from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./components/Auth/LoginForm";
import RegistrationForm from "./components/Auth/RegistrationForm";
import Profile from "./components/Profile/Profile";
import Layout from "./components/Layout/Layout";
import ForgetPassword from "./components/Auth/ForgetPassword";
import Expenses from "./components/Expenses/Expenses";
import { useSelector } from "react-redux";
import ThemeContextProvider from "./components/Context/Theme";

import ThemeContext from "./components/Context/Theme";

function App() {
  const amount = useContext(ThemeContext);
  const style = {
    light:{
      color: "black",
    background: "white",
    },
    dark:{
      color:"white",
      background:"black"
    },
    
  };
  const isLogin = useSelector((state) => state.auth.isLoggedin);
  console.log(isLogin);
  return (
    <div>
     <Layout>
      <Switch>
      {!isLogin && (
            <Route path="/" exact>
              <Redirect to="login" />
            </Route>
          )}

          {!isLogin && (
            <Route path="/login">
              <LoginForm />
            </Route>
          )}

          {!isLogin && (
            <Route path="/register">
              <RegistrationForm />
            </Route>
          )}
          {!isLogin && (
            <Route path="/forget">
              <ForgetPassword />
            </Route>
          )}
          {isLogin && (
            <Route path="/home">
              <Home />
            </Route>
          )}
          <Route path="/profile">
            {isLogin && <Profile />}
            {!isLogin && <Redirect to="/login" />}
          </Route>
          {isLogin && (
            <Route path="/expense">
              <Expenses />
            </Route>
          )}

          {!isLogin && (
            <Route path="*">
              <Redirect to="/login" />
            </Route>
          )}
          {isLogin && (
            <Route path="*">
              <Redirect to="/home" />
            </Route>
          )}
        </Switch>
      </Layout>
    </div>
  );
}
export default App;