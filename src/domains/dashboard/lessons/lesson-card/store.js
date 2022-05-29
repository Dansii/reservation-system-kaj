import {combine, createEffect, createEvent, restore, sample} from "effector";
import {createLessonHttp} from "./http";

export const createLessonFx = createEffect(({date, direction, lector, time, capacity, price}) => {
    return createLessonHttp(date, direction, lector, time, capacity, price);
});

export const changeDate = createEvent();
export const changeDirection = createEvent();
export const changeLector = createEvent();
export const changeTime = createEvent();
export const changeCapacity = createEvent();
export const changePrice = createEvent();
export const createLesson = createEvent();

export const $date = restore(changeDate, new Date());
export const $direction = restore(changeDirection, '');
export const $lector = restore(changeLector, '');
export const $time = restore(changeTime, '');
export const $capacity = restore(changeCapacity, '');
export const $price = restore(changePrice, '');
// export const $hasError = createStore(false)
//     .on(signUpFx.fail, () => true)
//     .on([changeEmail, changePassword], () => false);

const $createLesson = combine({
    date : $date,
    direction : $direction,
    lector : $lector,
    time : $time,
    capacity : $capacity,
    price : $price
});

sample({
    clock: createLesson,
    source: $createLesson,
    target: createLessonFx,
});
//
// sample({
//     clock: signUpFx.done,
//     target: setCurrentUser,
//     fn: (signUpFxPayload) => signUpFxPayload.result,
// });
//
// sample({
//     clock: signUpFx.done,
//     source: $history,
//     target: redirectToDashboardFx,
// });



