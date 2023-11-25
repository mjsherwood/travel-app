function checkAccountLevel(requiredRoles) {
    return function(req, res, next) {
        if (!req.user || !requiredRoles.includes(req.user.role)) {
            return res.redirect('/login');
        }
        next();
    };
}

module.exports = checkAccountLevel;