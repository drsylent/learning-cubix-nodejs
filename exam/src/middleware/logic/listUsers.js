import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/listUsers');

function doesCurrentlyFollow(userName, signedInUser) {
    if (signedInUser && signedInUser.userName !== userName) {
        const found = signedInUser.follows.find(follows => follows === userName);
        return typeof found !== 'undefined';
    }
}

function listUsers(model) {
    return (req, res, next) => {
        logger.traceWithParameters('MW called', req, res);
        res.locals.users = model.chain().data().map(user => ({
            userName: user.userName,
            currentlyFollows: doesCurrentlyFollow(user.userName, res.locals.user)
        }));
        return next();
    };
}

export { listUsers };
