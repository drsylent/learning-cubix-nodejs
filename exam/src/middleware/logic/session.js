import session from "express-session";

const trueSession = session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: true,
});

export { trueSession as session };
