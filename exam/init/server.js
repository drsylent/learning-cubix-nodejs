import express from "express";

function initRoutes(app, middlewares) {
    app.use(middlewares.logic.session);
    app.get('/', middlewares.logic.mustNotBeSignedIn, middlewares.render.main);
    app.get('/login', middlewares.logic.mustNotBeSignedIn, middlewares.render.login);
    app.post('/login', middlewares.logic.mustNotBeSignedIn, middlewares.logic.findUser.userName, 
            middlewares.logic.login, middlewares.redirect.followedTweets);
    app.post('/logout', middlewares.logic.logout, middlewares.redirect.main);
    app.get('/register', middlewares.logic.mustNotBeSignedIn, middlewares.render.register);
    app.post('/register', middlewares.logic.mustNotBeSignedIn, 
            middlewares.logic.findUser.userName, middlewares.logic.findUser.email,
            middlewares.logic.register, middlewares.logic.emailSecret, middlewares.logic.emailSend, 
            middlewares.logic.persist, middlewares.redirect.login);
    app.get('/password/forgot', middlewares.logic.mustNotBeSignedIn, middlewares.render.forgottenPassword);
    app.post('/password/forgot', middlewares.logic.mustNotBeSignedIn);
    app.get('/password/modify/:secret', middlewares.render.forgottenPassword);
    // app.post('/password/modify/:secret');
    app.get('/users', middlewares.render.listUsers);
    app.get('/:userName/tweets', middlewares.render.listTweets);
    app.get('/account/followed/tweets', middlewares.logic.authorize, middlewares.render.listTweets);
    app.get('/account/followed/users', middlewares.logic.authorize, middlewares.render.listUsers);
    app.post('/account/follow/:userName', middlewares.logic.authorize);
    app.post('/account/unfollow/:userName', middlewares.logic.authorize);
    app.get('/tweet', middlewares.logic.authorize, middlewares.render.tweet);
    app.post('/tweet', middlewares.logic.authorize);
    app.post('/tweet/:tweetId/delete', middlewares.logic.authorize);
    app.get('/account/email/modify', middlewares.logic.authorize, middlewares.render.modifyEmail);
    app.post('/account/email/modify', middlewares.logic.authorize);
    app.get('/email/modify/:secret', middlewares.logic.findUser.emailSecret, middlewares.logic.modifyEmail,
            middlewares.logic.persist, middlewares.redirect.main);
    app.get('/account/password/modify', middlewares.logic.authorize, middlewares.render.modifyPassword);
    // app.post('/account/password/modify');
    app.get('/error', middlewares.render.error);
}

function initErrorHandlers(app, errorMiddlewares) {
    app.use(errorMiddlewares.authorize);
    app.use(errorMiddlewares.mustNotBeSignedIn);
    app.use(errorMiddlewares.login);
    app.use(errorMiddlewares.register);
    app.use(errorMiddlewares.emailSecret);
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
