import { render as renderMw } from "../middleware/view/render.js";
import { session } from "../middleware/logic/session.js";
import { authorize } from "../middleware/logic/authorize.js";
import { authorize as authorizeError } from "../middleware/error/authorize.js";
import { mustNotBeSignedIn } from "../middleware/logic/mustNotBeSignedIn.js";
import { mustNotBeSignedIn as mustNotBeSignedInError } from "../middleware/error/mustNotBeSignedIn.js";

function initMiddlewares({ db, model }) {
    const logic = {
        session,
        authorize,
        mustNotBeSignedIn
    };
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
    const error = {
        authorize: authorizeError,
        mustNotBeSignedIn: mustNotBeSignedInError
    }
    return { render, logic, error };
}

export { initMiddlewares };
