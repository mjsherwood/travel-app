// utils/checkAccountLevel.js

function checkAccountLevel(requiredRoles, allRolesRequired = false) {
    return function(req, res, next) {
        if (!req.user) {
            return res.redirect('/login');
        }

        const userRole = req.user.role;
        if (allRolesRequired) {
            // Check if user has all the required roles
            const hasAllRoles = requiredRoles.every(role => userRole.includes(role));
            if (!hasAllRoles) {
                return res.status(403).send('Access Denied');
            }
        } else {
            // Check if user has any of the required roles
            const hasRequiredRole = requiredRoles.some(role => role === userRole);
            if (!hasRequiredRole) {
                return res.status(403).send('Access Denied');
            }
        }

        next();
    };
}

module.exports = checkAccountLevel;
