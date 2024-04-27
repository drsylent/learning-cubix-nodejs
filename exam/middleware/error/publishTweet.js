import { setWarning } from '../../utility/warning.js';

const errorMessage = 'publishTweet';

const publishTweet = (err, req, res, next) => {
    if (err.message === errorMessage) {
        setWarning(req.session, 'A tweet üres volt');
        return res.redirect('/' + req.session.userName + '/tweets'); 
    }
    return next(err);
}

export { publishTweet, errorMessage };
