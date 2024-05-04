import { object, string } from 'yup';
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/publishTweet');
const schema = object({
    tweet: string().required("A tweet nem lehet üres").trim().max(300, "A tweet maximum 300 karakter hosszú lehet")
});

function publishTweet(uuid) {
    return async (req, res, next) => {
        logger.traceWithParameters('MW called', req, res);
        await schema.validate(req.body);
        if (res.locals.tweet) {
            res.locals.tweet.content = req.body.tweet;
            logger.info(`Tweet was modified for user ${req.session.userName} with ID ${res.locals.tweetId}`);
        }
        else {
            const id = uuid();
            res.locals.user.tweets[id] = {
                content: req.body.tweet,
                publishedOn: Date.now()
            };
            logger.info(`A new tweet was created by user ${req.session.userName} with ID ${id}`);
        }
        return next();
    }
}

export { publishTweet };
