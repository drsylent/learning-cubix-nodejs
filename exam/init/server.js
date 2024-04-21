import express from "express";

function initRoutes(app, middlewares) {
    app.get('/', middlewares.render.main);
    app.get('/login', middlewares.render.login);
    app.get('/register',  middlewares.render.register);
    app.get('/account/followed/tweets',  middlewares.render.listTweets);
    app.get('/account/followed/users',  middlewares.render.listUsers);
    app.get('/password/forgot',  middlewares.render.forgottenPassword);
    app.get('/account/email/modify',  middlewares.render.modifyEmail);
    app.get('/account/password/modify',  middlewares.render.modifyPassword);
    app.get('/tweet',  middlewares.render.tweet);
    app.get('/error',  middlewares.render.error);
}

function initServer(middlewares) {
    const app = express();

    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: false }));

    // static assets (CSS)
    app.use('/assets', express.static('assets'));

    initRoutes(app, middlewares);

    app.listen(8080, function () {
        console.log('Running on :8080');
    });
}

export { initServer };
