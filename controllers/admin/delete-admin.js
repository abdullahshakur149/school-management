const Admin = require('../../data-modals/user-models/admin-model');

module.exports.deleteAdmin = async function (req, res) {
    let deletedAdmin = await Admin.findOneAndDelete({ _id: req.params.id });
    req.flash('success', "Successfully deleted Admin: ");
    res.redirect('/admin');
}