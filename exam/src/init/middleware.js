import { v4 as uuid } from 'uuid';
import { session } from "../middleware/logic/session.js";
import { authorize } from "../middleware/logic/authorize.js";
import { mustNotBeSignedIn } from "../middleware/logic/mustNotBeSignedIn.js";
import { findUser } from '../middleware/logic/findUser.js';
import { register } from "../middleware/logic/register.js";
import { login } from '../middleware/logic/login.js';
import { logout } from '../middleware/logic/logout.js';
import { emailSend } from "../middleware/logic/emailSend.js";
import { emailSecret } from "../middleware/logic/emailSecret.js";
import { modifyEmail } from '../middleware/logic/modifyEmail.js';
import { forgottenPasswordSecret } from '../middleware/logic/forgottenPasswordSecret.js';
import { modifyPassword } from '../middleware/logic/modifyPassword.js';
import { listFollows } from '../middleware/logic/listFollows.js';
import { listUsers } from '../middleware/logic/listUsers.js';
import { listTweets } from '../middleware/logic/listTweets.js';
import { follow } from '../middleware/logic/follow.js';
import { unfollow } from '../middleware/logic/unfollow.js';
import { findTweet } from '../middleware/logic/findTweet.js';
import { publishTweet } from '../middleware/logic/publishTweet.js';
import { deleteTweet } from '../middleware/logic/deleteTweet.js';
import { persist } from '../middleware/logic/persist.js';
import { render as renderMw } from "../middleware/view/render.js";
import { redirect as redirectMw } from '../middleware/view/redirect.js';
import { notFound } from '../middleware/view/notFound.js';
import { redirectSimply } from '../middleware/error/redirectSimply.js';
import { warningShowing } from '../middleware/error/warningShowing.js';
import { fallback } from '../middleware/error/fallback.js';
import { logRequest } from '../middleware/observation/requestLogging.js';
import { logging } from '../utility/logging.js';

const logger = logging('init/middleware');

function initMiddlewares({ db, model }) {
    logger.debug('Middleware initialization started');
    const logic = {
        session,
        authorize,
        mustNotBeSignedIn,
        findUser: {
            email: findUser(model, 
                (req) => ({$or: [{ emailTemporary: req.body.email }, { email: req.body.email }] }), 
                (res, user) => { res.locals.userByEmail = user; } ),
            userName: findUser(model, 
                (req) => ({$or: [{ userName: req.body.userName }, { userName: req.params.userName }] }), 
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
        login,
        logout,
        register: register(model),
        emailSend,
        emailSecret: emailSecret(uuid),
        modifyEmail,
        forgottenPasswordSecret: forgottenPasswordSecret(uuid),
        modifyPassword,
        listFollows: listFollows(model),
        listUsers: listUsers(model),
        listTweets: listTweets(model),
        follow,
        unfollow,
        findTweet,
        publishTweet: publishTweet(uuid),
        deleteTweet,
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
        main: redirectMw('/'),
        login: redirectMw('/login'),
        followedTweets: redirectMw('/account/followed/tweets'),
        followedUsers: redirectMw('/account/followed/users'),
        modifyEmail: redirectMw('/account/email/modify'),
        modifyPassword: redirectMw('/account/password/modify'),
        signedInTweets: redirectMw('/:userName/tweets')
    };
    const error = {
        redirectSimply,
        warningShowing,
        fallback
    };
    const observation = {
        logRequest
    }
    logger.debug('Middleware initialization completed');
    return { logic, render, redirect, error, observation, notFound };
}

export { initMiddlewares };
