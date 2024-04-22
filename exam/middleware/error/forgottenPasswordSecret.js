const errorMessage = 'forgottenPasswordSecret';

const forgottenPasswordSecret = (err, req, res, next) => {
    if (err.message === errorMessage) {
        console.log("There was no email found for forgotten password feature");
        return res.redirect('/login'); 
    }
    return next(err);
}

export { forgottenPasswordSecret, errorMessage };
