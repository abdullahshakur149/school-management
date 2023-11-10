const mongoose = require('mongoose');
const User = require('../../data-modals/user');
const adminSchema = mongoose.Schema({
    phoneNo: { type: String },
    address: {
        type: String,
        required: true,
    },
    userInfo: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
})

// adding a post delete middleware to student schema so that it could run before deleting some student
adminSchema.post("findOneAndDelete", async function (deletedAdmin, next) {
    //Delete user information associated with admin
    await User.findOneAndDelete(deletedAdmin.userInfo);

    next();
});

const AdminModel = mongoose.model("Admin", adminSchema);
module.exports = AdminModel;