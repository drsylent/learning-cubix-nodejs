function prepareEmail(res, address, content) {
    if (!res.locals.emailsToSend) {
        res.locals.emailsToSend = [];
    }
    res.locals.emailsToSend.push({ address, content });
}

const emailSend = (req, res, next) => {
    if (res.locals.emailsToSend) {
        res.locals.emailsToSend.forEach(email => {
            console.log(`Sending email to ${email.address} with content ${email.content}`);
        });
    }
    else {
        console.error("It seems that an email should be sent per route - but none is prepared!");
    }
    return next();
};

export { emailSend, prepareEmail };
