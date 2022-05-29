import {createEvent, createStore} from "effector";

export const setCurrentUser = createEvent();

export const getCurrentUser = () => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser === null ? null : currentUser
}

export const $currentUser = createStore(getCurrentUser())
    .on(setCurrentUser, (_,user) => user)
