export const getLessonsHttps = (pageNumber) => {
    return new Promise((resolve) => {
        let lessons = JSON.parse(localStorage.getItem("lessons"));
        lessons = lessons === null ? [] : lessons;

        const lessonsOnCurrentPage = lessons.slice((pageNumber - 1) * 10 , pageNumber * 10);

        setTimeout(() => {
            resolve({
                lessons: lessonsOnCurrentPage.length === 0 ? null : lessonsOnCurrentPage,
                total: lessons.length,
            });
        }, 500)
    })
}


export const bookSlotHttp = (username, lessonId) => {
    return new Promise((resolve, reject) => {
        let lessons = JSON.parse(localStorage.getItem("lessons"));
        let users = JSON.parse(localStorage.getItem("users"));
        let currentLesson = lessons.find(lesson => lesson.id === lessonId);
        let currentUser = users.find(user => user.username === username.username)

        if (currentLesson.freeSlots > 0 && !currentUser.lessons.includes(lessonId)) {
            currentLesson.freeSlots--;
            currentUser.lessons.push(lessonId)
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("lessons", JSON.stringify(lessons));
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            resolve(currentUser)
        } else {
            reject("there are no available slots")
        }


    })
}

export const unbookSlotHttp = (username, lessonId) => {

    return new Promise((resolve, reject) => {
        let lessons = JSON.parse(localStorage.getItem("lessons"));
        let users = JSON.parse(localStorage.getItem("users"));
        let currentLesson = lessons.find(lesson => lesson.id === lessonId);
        let currentUser = users.find(user => user.username === username.username)
        console.log(currentUser)
        console.log(currentLesson)

        if (currentLesson.freeSlots >= 0  && currentUser.lessons.includes(lessonId)) {
            currentLesson.freeSlots++;
            currentUser.lessons = currentUser.lessons.filter(lesson => lesson !== lessonId)
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("lessons", JSON.stringify(lessons));
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            resolve(currentUser)
        } else {
            reject("you can't cancel this reservation")
        }


    })
}



