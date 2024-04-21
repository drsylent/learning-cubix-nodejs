const mockedUserNameSetSession = (req, res, next) => {
    req.session = { userName: "test" };
    console.log('Session username set as "test" for mocking purposes');
    return next();
};

const mockedEmptySession = (req, res, next) => {
    req.session = { };
    console.log('Session is empty mocking purposes');
    return next();
};

// export { mockedUserNameSetSession as session };
export { mockedEmptySession as session };
