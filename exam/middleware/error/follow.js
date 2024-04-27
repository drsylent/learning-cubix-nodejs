import { setWarning } from '../../utility/warning.js';

const notFoundErrorMessage = 'follow-notFound';
const alreadyFollowingErrorMessage = 'follow-alreadyFollowing';

const follow = (err, req, res, next) => {
    if (err.message === notFoundErrorMessage) {
        setWarning(req.session, 'A követni kívánt felhasználó nem található.');
        return res.redirect('/account/followed/users'); 
    }
    if (err.message === alreadyFollowingErrorMessage) {
        setWarning(req.session, 'A felhasználót már követed.');
        return res.redirect('/account/followed/users'); 
    }
    return next(err);
}

export { follow, notFoundErrorMessage, alreadyFollowingErrorMessage };
