import { setWarning } from '../../utility/warning.js';

const errorMessage = 'findTweet';

const findTweet = (err, req, res, next) => {
    if (err.message === errorMessage) {
        setWarning(req.session, 'A tweet nem volt megtalálható');
        return res.redirect('/' + req.session.userName + '/tweets'); 
    }
    return next(err);
}

export { findTweet, errorMessage };
