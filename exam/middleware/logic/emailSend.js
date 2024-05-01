import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/prepareEmail');

function prepareEmail(res, address, content) {
    if (!res.locals.emailsToSend) {
        res.locals.emailsToSend = [];
    }
    logger.debug('Prepared an email for ' + address);
    res.locals.emailsToSend.push({ address, content });
}

const emailSend = (req, res, next) => {
    logger.trace('MW called', req, res);
    if (res.locals.emailsToSend) {
        res.locals.emailsToSend.forEach(email => {
            logger.info(`Sending email to ${email.address} with content ${email.content}`);
            // email sending would be here
        });
    }
    else {
        logger.error("It seems that an email should be sent per route - but none is prepared!");
    }
    return next();
};

export { emailSend, prepareEmail };
