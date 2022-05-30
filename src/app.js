import React from 'react'
import {SignInForm} from "./domains/sing-in-form/sign-in-form";
import {SignUpForm} from "./domains/sign-up-form/sign-up-form";
import {Switch, Route , useHistory} from "react-router-dom";
import {Dashboard} from "./domains/dashboard/dashboard";
import {HistoryGate} from "./domains/history/store";

export const App = () => {
    const history = useHistory();

    return (
        <>
            <Switch>
                <Route path={'/reservation-system-kaj'} exact={true}>
                    <SignInForm/>
                </Route>
                <Route path={'/reservation-system-kaj/sign-up'}>
                    <SignUpForm/>
                </Route>
                <Route path={'/reservation-system-kaj/dashboard'} exact={true}>
                    <Dashboard/>
                </Route>
            </Switch>
            <HistoryGate history={history} />
        </>
    );
}