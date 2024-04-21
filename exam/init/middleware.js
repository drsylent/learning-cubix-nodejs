import { v4 as uuid } from 'uuid';
import { session } from "../middleware/logic/session.js";
import { authorize } from "../middleware/logic/authorize.js";
import { authorize as authorizeError } from "../middleware/error/authorize.js";
import { mustNotBeSignedIn } from "../middleware/logic/mustNotBeSignedIn.js";
import { mustNotBeSignedIn as mustNotBeSignedInError } from "../middleware/error/mustNotBeSignedIn.js";
import { findUser } from '../middleware/logic/findUser.js';
import { register } from "../middleware/logic/register.js";
import { register as registerError } from "../middleware/error/register.js";
import { emailSend } from "../middleware/logic/emailSend.js";
import { emailSecret } from "../middleware/logic/emailSecret.js";
import { persist } from '../middleware/logic/persist.js';
import { render as renderMw } from "../middleware/view/render.js";
import { redirect as redirectMw } from '../middleware/view/redirect.js';

function initMiddlewares({ db, model }) {
    const logic = {
        session,
        authorize,
        mustNotBeSignedIn,
        findUser: findUser(model),
        register: register(model),
        emailSend,
        emailSecret: emailSecret(model, uuid),
        persist: persist(db)
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
    const redirect = {
        login: redirectMw('/login')
    };
    const error = {
        authorize: authorizeError,
        mustNotBeSignedIn: mustNotBeSignedInError,
        register: registerError
    };
    return { logic, render, redirect, error };
}

export { initMiddlewares };
