import {combine, createEffect, createEvent, createStore, restore, sample} from "effector";
import {setCurrentUser} from "../current-user/store";
import {signInHttp} from "./http";
import {$history, redirectToDashboardFx} from "../history/store";

export const signInFx = createEffect(({email, password}) => {
    return signInHttp(email, password)
});


export const changeEmail = createEvent();
export const changePassword = createEvent();
export const signIn = createEvent();

export const $email = restore(changeEmail, '');
export const $password = restore(changePassword, '');
export const $hasError = createStore(false)
    .on(signInFx.fail, () => true)
    .on([changeEmail, changePassword], () => false);

const $signIn = combine({
    email: $email,
    password: $password,
});

sample({
    clock: signIn,
    source: $signIn,
    target: signInFx,
});

sample({
    clock: signInFx.done,
    target: setCurrentUser,
    fn: (signInFxPayload) => signInFxPayload.result,
});

sample({
    clock: signInFx.done,
    source: $history,
    target: redirectToDashboardFx,
});

