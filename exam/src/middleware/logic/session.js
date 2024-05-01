import session from "express-session";

const mockedUserNameSetSession = (req, res, next) => {
    req.session = { userName: "testuser1" };
    console.log('Session username set as "test" for mocking purposes');
    return next();
};

const mockedEmptySession = (req, res, next) => {
    req.session = { };
    console.log('Session is empty mocking purposes');
    return next();
};

const trueSession = session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: true,
});

// export { mockedUserNameSetSession as session };
// export { mockedEmptySession as session };
export { trueSession as session };
