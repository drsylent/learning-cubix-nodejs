import express from "express";
import session from "express-session";

const app = express();

app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: true,
}));

app.get('/', (req, res, next) => {
    if (typeof req.session.number === 'undefined') {
        req.session.number = 0;
    }
    res.locals.number = req.session.number;
    return res.render('index.ejs', res.locals);
});

app.post("/increase", (req, res, next) => {
    req.session.number++;
    return req.session.save((err) => {
        return res.redirect("/");
    });
});

app.post("/reset", (req, res, next) => {
    return req.session.regenerate((err) => {
        return res.redirect("/");
    });
});

app.listen(8080, function () {
    console.log('Running on :8080');
});
