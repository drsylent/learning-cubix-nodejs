import express from "express";

const app = express();

app.use('/assets', express.static('assets'));

app.get('/', (req, res, next) => res.render('index.ejs', res.locals));
app.get('/login', (req, res, next) => res.render('login.ejs', res.locals));
app.get('/register', (req, res, next) => res.render('register.ejs', res.locals));
app.get('/account/followed/tweets', (req, res, next) => res.render('list-tweets.ejs', res.locals));
app.get('/account/followed/users', (req, res, next) => res.render('list-users.ejs', res.locals));
app.get('/password/forgot', (req, res, next) => res.render('forgotten-password.ejs', res.locals));
app.get('/account/email/modify', (req, res, next) => res.render('modify-email.ejs', res.locals));
app.get('/account/password/modify', (req, res, next) => res.render('modify-password.ejs', res.locals));
app.get('/tweet', (req, res, next) => res.render('tweet.ejs', res.locals));
app.get('/error', (req, res, next) => res.render('error.ejs', res.locals));

app.listen(8080, function () {
    console.log('Running on :8080');
});
