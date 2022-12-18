import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Login from './Login/Login';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Dashboard from './Dashboard/Dashboard';
import { Provider } from "react-redux";
import store from "./js/store/index";


const loggedIn = JSON.parse(sessionStorage.getItem("_redux_state_data"))?.loginReducer.loggedIn

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={
      loggedIn ? (
        <Navigate replace to={"dashboard"} />
      ) : (
        <Navigate replace to={"login"} />
      )
    } />
    <Route path="login" element={<Login />} />
    <Route path="dashboard" element={<Dashboard />} />
  </>
));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
