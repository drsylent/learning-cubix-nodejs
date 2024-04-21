import querystring from 'querystring';

function redirect(path) {
    return (req, res, next) => {
        let redirect = path;
        if (res.locals.warning) {
            redirect += '?' + querystring.encode({ warning: res.locals.warning });
        }
        return res.redirect(redirect); 
    };
}

export { redirect };
