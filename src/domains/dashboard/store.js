import {createEvent, sample} from "effector";
import {$history, signOutFx} from "../history/store";

export const signOut = createEvent();

sample({
    clock: signOut,
    source: $history,
    target: signOutFx,
});
