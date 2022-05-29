export const adminUser = {
    username: "admin@mail.com",
    password: "Password123",
};

export const signInHttp = (username, password) => {
    return new Promise((resolve, reject) => {
        let users = JSON.parse(localStorage.getItem("users"));
        users = users === null ? [] : users;

        const user = users.find((currentUser) => currentUser.username === username && currentUser.password === password);
        let lessons = (user) ? user.lessons : [];


        setTimeout(() => {
            if (adminUser.username === username && adminUser.password === password) {
                let currentUser = {
                    username: username,
                    isAdmin: false,
                    lessons: lessons
                }
                users.push({
                    username,
                    password,
                    lessons
                });
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                localStorage.setItem("users", JSON.stringify(users));
                resolve(currentUser);
            }
            if (user) {
                let currentUser = {
                    username: username,
                    isAdmin: false,
                    lessons: user.lessons
                }
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                resolve(currentUser);
            } else {
                reject();
            }
        }, 500);
    });
}