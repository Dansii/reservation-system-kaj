import React from 'react'
import {SignInForm} from "./domains/sing-in-form/sign-in-form";
import {SignUpForm} from "./domains/sign-up-form/sign-up-form";
import {Switch, Route, useHistory} from "react-router-dom";
import {Dashboard} from "./domains/dashboard/dashboard";
import {HistoryGate} from "./domains/history/store";

export const App = () => {
    const history = useHistory();

    return (
        <>
            <Switch>
                <Route path={'/sign-in'} exact={true} component={SignInForm}>
                </Route>
                <Route path={'/sign-up'} component={SignUpForm}>
                </Route>
                <Route path={'/dashboard'} exact={true} component={Dashboard}>
                </Route>
            </Switch>
            <HistoryGate history={history} />
        </>
    );
}