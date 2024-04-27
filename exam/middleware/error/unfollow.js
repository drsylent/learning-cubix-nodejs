import { setWarning } from '../../utility/warning.js';

const notFoundErrorMessage = 'unfollow-notFound';
const alreadyFollowingErrorMessage = 'unfollow-alreadyFollowing';

const unfollow = (err, req, res, next) => {
    if (err.message === notFoundErrorMessage) {
        setWarning(req.session, 'A felhasználó nem található.');
        return res.redirect('/account/followed/users'); 
    }
    if (err.message === alreadyFollowingErrorMessage) {
        setWarning(req.session, 'A felhasználót eddig sem követted.');
        return res.redirect('/account/followed/users'); 
    }
    return next(err);
}

export { unfollow, notFoundErrorMessage, alreadyFollowingErrorMessage };
