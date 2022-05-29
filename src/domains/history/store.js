import {createGate} from "effector-react";
import {createStore} from "effector";
import {createEffect} from "effector/compat";

export const HistoryGate = createGate();

export const redirectToDashboardFx = createEffect((history) => {
    history.push("dashboard");
})
export const redirectToLogInFx = createEffect((history) => {
    history.push("sign-in");
})

export const signOutFx = createEffect((history) => {
    localStorage.removeItem("currentUser");
    history.push("sign-in");
})

export const $history = createStore(null)
    .on(HistoryGate.state, (_, {history}) => history);
