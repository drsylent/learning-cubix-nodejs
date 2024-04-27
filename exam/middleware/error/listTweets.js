import { setWarning } from '../../utility/warning.js';

const errorMessage = 'listTweets';

const listTweets = (err, req, res, next) => {
    if (err.message === errorMessage) {
        setWarning(req.session, 'A megadott felhasználó nem létezik');
        return res.redirect('/users'); 
    }
    return next(err);
}

export { listTweets, errorMessage };
