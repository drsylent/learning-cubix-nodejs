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
import { emailSecret as emailSecretError } from '../middleware/error/emailSecret.js';
import { modifyEmail } from '../middleware/logic/modifyEmail.js';
import { persist } from '../middleware/logic/persist.js';
import { render as renderMw } from "../middleware/view/render.js";
import { redirect as redirectMw } from '../middleware/view/redirect.js';
import { fallback } from '../middleware/error/fallback.js';

function initMiddlewares({ db, model }) {
    const logic = {
        session,
        authorize,
        mustNotBeSignedIn,
        findUser: {
            email: findUser(model, 
                (req) => ({$or: [{ emailTemporary: req.body.email }, { email: req.body.email }] }), 
                (res, user) => { res.locals.userByEmail = user; } ),
            userName: findUser(model, 
                (req) => ({ userName: req.body.userName }), 
                (res, user) => { res.locals.userByUserName = user; }),
            emailSecret: findUser(model, 
                (req) => ({ emailSecret: req.params.secret }), 
                (res, user) => { res.locals.userByEmailSecret = user; }),
            passwordSecret: findUser(model, 
                (req) => ({ passwordSecret: req.params.secret }), 
                (res, user) => { res.locals.userByPasswordSecret = user; }),
            signedIn: findUser(model, 
                (req) => ({ userName: req.session.userName }), 
                (res, user) => { res.locals.user = user; })
        },
        register: register(model),
        emailSend,
        emailSecret: emailSecret(model, uuid),
        modifyEmail: modifyEmail(model),
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
        login: redirectMw('/login'),
        main: redirectMw('/')
    };
    const error = {
        authorize: authorizeError,
        mustNotBeSignedIn: mustNotBeSignedInError,
        register: registerError,
        emailSecret: emailSecretError,
        fallback
    };
    return { logic, render, redirect, error };
}

export { initMiddlewares };
