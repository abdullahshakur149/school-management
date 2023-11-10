module.exports = function (req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must log in first.");
        res.redirect("/login");
    } else {
        next();
    }
};