import express from "express";
import { createServerInstance, startListening } from "../server/express.js";
import { logging } from "../utility/logging.js";

const logger = logging('init/server');

function initRoutes(app, { logic, render, redirect, notFound }) {
    app.use(logic.session);
    app.get('/', logic.mustNotBeSignedIn, render.main);
    app.get('/login', logic.mustNotBeSignedIn, render.login);
    app.post('/login', logic.mustNotBeSignedIn, logic.findUser.userName,
        logic.login, redirect.main);
    app.post('/logout', logic.logout, redirect.main);
    app.get('/register', logic.mustNotBeSignedIn, render.register);
    app.post('/register', logic.mustNotBeSignedIn,
        logic.findUser.userName, logic.findUser.email,
        logic.register, logic.emailSecret, logic.emailSend,
        logic.persist, redirect.login);
    app.get('/password/forgot', logic.mustNotBeSignedIn, render.forgottenPassword);
    app.post('/password/forgot', logic.mustNotBeSignedIn, logic.findUser.email,
        logic.forgottenPasswordSecret, logic.emailSend, logic.persist, redirect.login);
    app.get('/password/modify/:secret', render.modifyPassword);
    app.post('/password/modify/:secret', logic.findUser.passwordSecret, logic.modifyPassword, logic.persist, redirect.login);
    app.get('/users', logic.findUser.signedIn, logic.listUsers, render.listUsers);
    app.get('/:userName/tweets', logic.findUser.signedIn, logic.listTweets, render.listTweets);
    app.get('/account/followed/tweets', logic.authorize, logic.findUser.signedIn,
        logic.listTweets, render.listTweets);
    app.get('/account/followed/users', logic.authorize, logic.findUser.signedIn, logic.listFollows, render.listUsers);
    app.post('/account/follow/:userName', logic.authorize,
        logic.findUser.signedIn, logic.findUser.userName,
        logic.follow, logic.persist, redirect.followedUsers);
    app.post('/account/unfollow/:userName', logic.authorize,
        logic.findUser.signedIn, logic.findUser.userName,
        logic.unfollow, logic.persist, redirect.followedUsers);
    app.get('/tweet', logic.authorize, logic.findUser.signedIn, render.tweet);
    app.post('/tweet', logic.authorize, logic.findUser.signedIn,
        logic.publishTweet, logic.persist, redirect.signedInTweets);
    app.get('/tweet/:tweetId/modify', logic.authorize, logic.findUser.signedIn, logic.findTweet, render.tweet);
    app.post('/tweet/:tweetId/modify', logic.authorize, logic.findUser.signedIn,
        logic.findTweet, logic.publishTweet, logic.persist, redirect.signedInTweets);
    app.post('/tweet/:tweetId/delete', logic.authorize, logic.findUser.signedIn, logic.findTweet,
        logic.deleteTweet, logic.persist, redirect.signedInTweets);
    app.get('/account/email/modify', logic.authorize, render.modifyEmail);
    app.post('/account/email/modify', logic.authorize, logic.findUser.signedIn, logic.findUser.email,
        logic.emailSecret, logic.emailSend, logic.persist, redirect.modifyEmail);
    app.get('/email/modify/:secret', logic.findUser.emailSecret, logic.modifyEmail,
        logic.persist, redirect.login);
    app.get('/account/password/modify', logic.authorize, render.modifyPassword);
    app.post('/account/password/modify', logic.authorize, logic.findUser.signedIn,
        logic.modifyPassword, logic.persist, redirect.main);
    app.get('/error', render.error);
    app.get('/favicon.ico', notFound);
    // fallback to main page if non-existent page is queried
    app.get('*', redirect.main);
}

function initErrorHandlers(app, errorMiddlewares) {
    app.use(errorMiddlewares.redirectSimply);
    app.use(errorMiddlewares.warningShowing);
    app.use(errorMiddlewares.fallback);
}

function initServer(middlewares) {
    logger.debug('Server initialization started');
    const app = createServerInstance();

    // static assets (CSS)
    app.use('/assets', express.static('assets'));

    app.use(middlewares.observation.logRequest);
    initRoutes(app, middlewares);
    initErrorHandlers(app, middlewares.error);
    logger.debug('Server initialization completed');

    startListening(app);
}

export { initServer };
