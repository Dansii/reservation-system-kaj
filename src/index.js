import React from "react";
import ReactDOM from "react-dom";
import {App} from "./app";
import {HashRouter} from "react-router-dom";

const applicationRootRef = document.getElementById("applicationRoot");

if (applicationRootRef) {
    ReactDOM.render(
        <HashRouter>
            <App />
        </HashRouter>,
        applicationRootRef,
    );
}
