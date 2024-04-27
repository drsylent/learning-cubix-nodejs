import express from "express";

function initRoutes(app, { logic, render, redirect }) {
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
    app.get('/users', render.listUsers);
    app.get('/:userName/tweets', logic.listTweets, render.listTweets);
    app.get('/account/followed/tweets', logic.authorize, render.listTweets);
    app.get('/account/followed/users', logic.authorize, render.listUsers);
    app.post('/account/follow/:userName', logic.authorize);
    app.post('/account/unfollow/:userName', logic.authorize);
    app.get('/tweet', logic.authorize, logic.findUser.signedIn, logic.findTweet, render.tweet);
    app.post('/tweet', logic.authorize, logic.findUser.signedIn, 
             logic.findTweet, logic.publishTweet, logic.persist, redirect.signedInTweets);
    app.post('/tweet/:tweetId/delete', logic.authorize);
    app.get('/account/email/modify', logic.authorize, render.modifyEmail);
    app.post('/account/email/modify', logic.authorize, logic.findUser.signedIn, logic.findUser.email, 
            logic.emailSecret, logic.emailSend, logic.persist, redirect.modifyEmail);
    app.get('/email/modify/:secret', logic.findUser.emailSecret, logic.modifyEmail,
            logic.persist, redirect.main);
    app.get('/account/password/modify', logic.authorize, render.modifyPassword);
    app.post('/account/password/modify', logic.authorize, logic.findUser.signedIn, 
            logic.modifyPassword, logic.persist, redirect.modifyPassword);
    app.get('/error', render.error);
    // fallback to main page if non-existent page is queried
    app.get('*', redirect.main);
}

function initErrorHandlers(app, errorMiddlewares) {
    app.use(errorMiddlewares.authorize);
    app.use(errorMiddlewares.mustNotBeSignedIn);
    app.use(errorMiddlewares.login);
    app.use(errorMiddlewares.register);
    app.use(errorMiddlewares.modifyPassword);
    app.use(errorMiddlewares.emailSecret);
    app.use(errorMiddlewares.forgottenPasswordSecret);
    app.use(errorMiddlewares.listTweets);
    app.use(errorMiddlewares.findTweet);
    app.use(errorMiddlewares.publishTweet);
    app.use(errorMiddlewares.fallback);
}

function initServer(middlewares) {
    const app = express();

    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: false }));

    // static assets (CSS)
    app.use('/assets', express.static('assets'));

    initRoutes(app, middlewares);
    initErrorHandlers(app, middlewares.error);

    app.listen(8080, function () {
        console.log('Running on :8080');
    });
}

export { initServer };
