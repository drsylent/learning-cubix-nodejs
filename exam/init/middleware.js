import { render as renderMw } from "../middleware/view/render.js";

function initMiddlewares({ db, model }) {
    const render = {
        main: renderMw('index.ejs'),
        login: renderMw('login.ejs'),
        register: renderMw('register.ejs'),
        listTweets: renderMw('list-tweets.ejs'),
        listUsers: renderMw('list-users.ejs'),
        forgottenPassword: renderMw('forgotten-password.ejs'),
        modifyEmail: renderMw('modify-email.ejs'),
        modifyPassword: renderMw('modify-password.ejs'),
        tweet: renderMw('tweet.ejs'),
        error: renderMw('error.ejs')
    };
    return { render };
}

export { initMiddlewares };
