import {combine, createEffect, createEvent, createStore, restore, sample} from "effector";
import { getReservationsHttp} from "./http";
import {$currentUser, setCurrentUser} from "../../current-user/store";
import {$history, redirectToLogInFx} from "../../history/store";
import {unbookSlotFx} from "../lessons/store";

export const getReservationsFx = createEffect((pageNumber) => {
    return getReservationsHttp(pageNumber);
})

export const openPageWithReservations = createEvent();
export const changePage = createEvent();
export const unbookSlotOnLesson = createEvent();
export const redirectToLogIn = createEvent();

export const $currentLessonId = createStore( '')
    .on(unbookSlotOnLesson,(_, id) => id);

export const $pageNumber = restore(changePage, 1);
export const $totalPages = createStore(null)
    .on(getReservationsFx.doneData, (_, {total}) => Math.ceil(total / 10));
export const $lessons = createStore(null)
    .on(getReservationsFx.doneData, (_, {lessons}) => lessons);

const $bookSlot = combine({
    username: $currentUser,
    lessonId: $currentLessonId
});

sample({
    clock: openPageWithReservations,
    source: $pageNumber,
    target: getReservationsFx,
})

sample({
    clock: unbookSlotOnLesson,
    source: $bookSlot,
    target: unbookSlotFx,
})

sample({
    clock: redirectToLogIn,
    source: $history,
    target: redirectToLogInFx,
});

sample({
    clock: unbookSlotFx.done,
    target: setCurrentUser,
    fn: (signUpFxPayload) => signUpFxPayload.result,
});



