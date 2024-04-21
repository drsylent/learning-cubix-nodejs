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
    return next();
};

export { emailSend, prepareEmail };
