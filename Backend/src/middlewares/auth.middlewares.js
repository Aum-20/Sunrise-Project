const isAuthenticated = function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/admin/signIn'); // Redirect to login if not authenticated
}

module.exports = isAuthenticated;