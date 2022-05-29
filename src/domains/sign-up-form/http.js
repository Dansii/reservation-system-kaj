import {adminUser} from "../sing-in-form/http";

export const signUpHttp = (username, password) => {
    return new Promise((resolve, reject) => {
        let users = JSON.parse(localStorage.getItem("users"));
        users = users === null ? [] : users;
        let lessons = [];

        const isUsernameExist = users.some((currentUser) => currentUser.username === username);

        setTimeout(() => {
            if (isUsernameExist || username === adminUser.username) {
                reject("User already exits");
            } else {
                users.push({
                    username,
                    password,
                    lessons
                });
                let currentUser = {
                    username: username,
                    isAdmin: false,
                    lessons: []
                }
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                localStorage.setItem("users", JSON.stringify(users));
                resolve(currentUser);
            }
        }, 500);
    })
}