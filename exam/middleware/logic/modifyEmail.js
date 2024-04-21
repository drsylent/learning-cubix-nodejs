function modifyEmail(model) {
    return (req, res, next) => {
        const user = res.locals.userByEmailSecret;
        if (!user) {
            throw new Error("User not found");
        }
        user.email = user.emailTemporary;
        delete user.emailTemporary;
        delete user.emailSecret;
        return next();
    };
}

export { modifyEmail };
