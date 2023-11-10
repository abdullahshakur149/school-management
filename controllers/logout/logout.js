module.exports.logout = function (req, res) {
    if (req.user) {
        req.logout(() => {
            req.flash("success", "Logged out");
            res.redirect("/login");
        });
    } else {
        res.send('you have to login to logout');
    }
};