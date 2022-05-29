import React from "react";
import ReactDOM from "react-dom";
import {App} from "./app";
import {BrowserRouter} from "react-router-dom";

const applicationRootRef = document.getElementById("applicationRoot");

if (applicationRootRef) {
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        applicationRootRef,
    );
}
