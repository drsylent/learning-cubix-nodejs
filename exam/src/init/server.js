import express from "express";
import { configValue } from "../utility/config.js";
import { logging } from "../utility/logging.js";

const logger = logging('init/server');

function initRoutes(app, { logic, render, redirect, notFound }) {
    app.use(logic.session);
    app.get('/', logic.mustNotBeSignedIn, render.main);
    app.get('/login', logic.mustNotBeSignedIn, render.login);
    app.post('/login', logic.mustNotBeSignedIn, logic.findUser.userName,
        logic.login, redirect.followedTweets);
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
        logic.persist, redirect.main);
    app.get('/account/password/modify', logic.authorize, render.modifyPassword);
    app.post('/account/password/modify', logic.authorize, logic.findUser.signedIn,
        logic.modifyPassword, logic.persist, redirect.modifyPassword);
    app.get('/error', render.error);
    app.get('/favicon.ico', notFound);
    // fallback to main page if non-existent page is queried
    app.get('*', redirect.main);
}

function initErrorHandlers(app, errorMiddlewares) {
    app.use(errorMiddlewares.authorize);
    app.use(errorMiddlewares.mustNotBeSignedIn);
    app.use(errorMiddlewares.login);
    app.use(errorMiddlewares.register);
    app.use(errorMiddlewares.modifyEmail);
    app.use(errorMiddlewares.modifyPassword);
    app.use(errorMiddlewares.emailSecret);
    app.use(errorMiddlewares.forgottenPasswordSecret);
    app.use(errorMiddlewares.follow);
    app.use(errorMiddlewares.listTweets);
    app.use(errorMiddlewares.findTweet);
    app.use(errorMiddlewares.publishTweet);
    app.use(errorMiddlewares.fallback);
}

function shutdown(server) {
    return server.close(err => {
        if (err) {
            logger.error("Error during shutting down");
            process.exit(1);
        }
        else {
            logger.info("Shutting down");
            process.exit(0);
        }
    })
}

function prepareShutdownSignals(server) {
    // prepare for signals for graceful stopping
    process.on("SIGINT", () => shutdown(server));
    process.on("SIGTERM", () => shutdown(server));
}

function initServer(middlewares) {
    logger.debug('Server initialization started');
    const app = express();

    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: false }));

    // static assets (CSS)
    app.use('/assets', express.static('assets'));

    initRoutes(app, middlewares);
    initErrorHandlers(app, middlewares.error);
    logger.debug('Server initialization completed');

    const port = Number.parseInt(configValue("SERVER_PORT", "8080"));
    const server = app.listen(port, function () {
        logger.info('Server is listening on port ' + port);
    });
    prepareShutdownSignals(server);
}

export { initServer };