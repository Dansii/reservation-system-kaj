import React from "react";
import ReactDOM from "react-dom";
import {App} from "./app";
import {BrowserRouter, HashRouter} from "react-router-dom";

const applicationRootRef = document.getElementById("applicationRoot");

if (applicationRootRef) {
    ReactDOM.render(
        <HashRouter basename={"/reservation-system-kaj"}>
            <App />
        </HashRouter>,
        applicationRootRef,
    );
}
