import {combine, createEffect, createEvent, createStore, restore, sample} from "effector";
import {signUpHttp} from "./http";
import {setCurrentUser} from "../current-user/store";
import {$history, redirectToDashboardFx} from "../history/store";

export const signUpFx = createEffect(({email, password}) => {
    return signUpHttp(email, password);
});

export const changeEmail = createEvent();
export const changePassword = createEvent();
export const signUp = createEvent();

export const $email = restore(changeEmail, '');
export const $password = restore(changePassword, '');
export const $hasError = createStore(false)
    .on(signUpFx.fail, () => true)
    .on([changeEmail, changePassword], () => false);

const $signUp = combine({
    email: $email,
    password: $password,
});

sample({
    clock: signUp,
    source: $signUp,
    target: signUpFx,
});

sample({
    clock: signUpFx.done,
    target: setCurrentUser,
    fn: (signUpFxPayload) => signUpFxPayload.result,
});

sample({
    clock: signUpFx.done,
    source: $history,
    target: redirectToDashboardFx,
});



