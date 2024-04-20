import express from "express";

const app = express();

app.get('/', (req, res, next) => res.render('index.ejs', res.locals));
app.get('/login', (req, res, next) => res.render('login.ejs', res.locals));
app.get('/password/forgot', (req, res, next) => res.render('forgotten-password.ejs', res.locals));

app.listen(8080, function () {
    console.log('Running on :8080');
});
