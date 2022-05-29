import { v4 as uuidv4 } from 'uuid';
export const lectors = [
    {
        label:  "Anastasia",
        children:  "Anastasia",
        value: 1,
    },
    {
        label: "Lucie",
        children: "Lucie",
        value: 2,
    },
    {
        label: "Eugenia",
        children: "Eugenia",
        value: 3,
    },
    {
        label: "Maria",
        children: "Maria",
        value: 4,
    },
    {
        label: "Nina",
        children: "Nina",
        value: 5,
    },

];

export const directions = [
    {
        label:  "Latina",
        children:  "Latina",
        value: 1,
    },
    {
        label: "Stretching",
        children: "Stretching",
        value: 2,
    },
    {
        label: "Fitness",
        children: "Fitness",
        value: 3,
    },
    {
        label: "Hip-hop",
        children: "Hip-hop",
        value: 4,
    },
    {
        label: "Bachata",
        children: "Bachata",
        value: 5,
    },

];


export const createLessonHttp = (date, direction, lector, time, capacity, price) => {
    return new Promise((resolve, reject) => {
        let lessons = JSON.parse(localStorage.getItem("lessons"));
        lessons = lessons === null ? [] : lessons;
        direction = directions[direction-1].children;
        lector = lectors[lector-1].children;
        let freeSlots = capacity;
        let id = uuidv4();
        const [hours, minutes] = time.split(":");
        date.setHours(hours);
        date.setMinutes(minutes);
        // const isUsernameExist = lessons.some((currentUser) => currentUser.username === username);

        setTimeout(() => {
            // if (isUsernameExist || username === adminUser.username) {
            //     reject("User already exits");
            // } else {
                lessons.push({
                    id,
                    direction,
                    lector,
                    capacity,
                    date,
                    time,
                    price,
                    freeSlots
                });
            console.log(lessons)
                localStorage.setItem("lessons", JSON.stringify(lessons));
                resolve({
                    direction,
                    lector,
                    capacity,
                    date,
                    time,
                    price
                });
            // }
        }, 500);
    })
}