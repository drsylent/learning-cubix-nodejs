import express from "express";

function initRoutes(app, middlewares) {
    app.use(middlewares.logic.session);
    app.get('/', middlewares.logic.mustNotBeSignedIn, middlewares.render.main);
    app.get('/login', middlewares.logic.mustNotBeSignedIn, middlewares.render.login);
    app.post('/login', middlewares.logic.mustNotBeSignedIn);
    // app.post('/logout');
    app.get('/register', middlewares.logic.mustNotBeSignedIn, middlewares.render.register);
    app.post('/register', middlewares.logic.mustNotBeSignedIn);
    app.get('/password/forgot', middlewares.logic.mustNotBeSignedIn, middlewares.render.forgottenPassword);
    app.post('/password/forgot', middlewares.logic.mustNotBeSignedIn);
    app.get('/password/modify/:secret', middlewares.render.forgottenPassword);
    // app.post('/password/modify/:secret');
    app.get('/users', middlewares.render.listUsers);
    app.get('/:userName/tweets', middlewares.render.listTweets);
    app.get('/account/followed/tweets', middlewares.render.listTweets);
    app.get('/account/followed/users', middlewares.render.listUsers);
    // app.post('/account/follow/:userName');
    // app.post('/account/unfollow/:userName');
    app.get('/tweet', middlewares.render.tweet);
    // app.post('/tweet');
    // app.post('/tweet/:tweetId/delete');
    app.get('/account/email/modify', middlewares.render.modifyEmail);
    // app.post('/account/email/modify');
    // app.get('/email/modify/:secret');
    app.get('/account/password/modify', middlewares.render.modifyPassword);
    // app.post('/account/password/modify');
    app.get('/error', middlewares.render.error);
}

function initErrorHandlers(app, errorMiddlewares) {
    app.use(errorMiddlewares.mustNotBeSignedIn);
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
