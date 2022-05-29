import {combine, createEffect, createEvent, createStore, restore, sample} from "effector";
import {bookSlotHttp, getLessonsHttps, unbookSlotHttp} from "./http";
import {$currentUser, setCurrentUser} from "../../current-user/store";

export const bookSlotFx = createEffect(({username, lessonId}) => {
    return bookSlotHttp(username, lessonId);
})
export const unbookSlotFx = createEffect(({username, lessonId}) => {
    return unbookSlotHttp(username, lessonId);
})

export const getLessonsFx = createEffect((pageNumber) => {
    return getLessonsHttps(pageNumber);
})

export const openPageWithLessons = createEvent();
export const changePage = createEvent();
export const openModalForm = createEvent();
export const closeModalForm = createEvent();
export const bookSlotOnLesson = createEvent();
export const unbookSlotOnLesson = createEvent();




export const $isModalFormOpened = createStore(false)
    .on(openModalForm, () => true)
    .on(closeModalForm, () => false);

export const $currentLessonId = createStore( '')
    .on(bookSlotOnLesson, (_,id) => id)
    .on(unbookSlotOnLesson,(_, id) => id);

export const $pageNumber = restore(changePage, 1);
export const $totalPages = createStore(null)
    .on(getLessonsFx.doneData, (_, {total}) => Math.ceil(total / 10));
export const $lessons = createStore(null)
    .on(getLessonsFx.doneData, (_, {lessons}) => lessons);

const $bookSlot = combine({
    username: $currentUser,
    lessonId: $currentLessonId
});

sample({
    clock: openPageWithLessons,
    source: $pageNumber,
    target: getLessonsFx,
})

sample({
    clock: bookSlotOnLesson,
    source: $bookSlot,
    target: bookSlotFx,
})

sample({
    clock: unbookSlotOnLesson,
    source: $bookSlot,
    target: unbookSlotFx,
})

sample({
    clock: bookSlotFx.done,
    target: setCurrentUser,
    fn: (signUpFxPayload) => signUpFxPayload.result,
});

sample({
    clock: unbookSlotFx.done,
    target: setCurrentUser,
    fn: (signUpFxPayload) => signUpFxPayload.result,
});



