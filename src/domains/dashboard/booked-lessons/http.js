export const getReservationsHttp = (pageNumber) => {
    return new Promise((resolve) => {
        let lessons = JSON.parse(localStorage.getItem("lessons"));
        let bookedLessons = JSON.parse(localStorage.getItem("currentUser")).lessons;
        lessons = lessons.filter(lesson => bookedLessons.includes(lesson.id))
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




