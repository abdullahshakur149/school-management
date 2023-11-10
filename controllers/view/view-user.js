const { Error } = require('mongoose');
const Student = require('../../data-modals/user-models/student-model');
const Teacher = require('../../data-modals/user-models/teacher-model');
const Admin = require('../../data-modals/user-models/admin-model');
module.exports.renderViewUser = async function (req, res) {
    let user;
    let userToBeViewed = (req.originalUrl.split('/')[2] == 'admin') ? req.originalUrl.split('/')[3] : (req.originalUrl.split('/')[2] == 'student' || req.originalUrl.split('/')[2] == 'teacher') ? req.originalUrl.split('/')[2] : (req.originalUrl.split('/')[2] && req.originalUrl.split('/')[3] == 'student') ? req.originalUrl.split('/')[3] : '';
    try {
        switch (userToBeViewed) {
            case 'student':
                user = await Student.findById(req.params.id).populate([
                    { path: 'admittedClass', select: ['classType', 'classLevel', 'section', 'courses'] },
                    { path: 'userInfo' },
                    { path: 'admittedClass', select: ['classLevel', 'section', 'classID'] }
                ]);
                break;
            case 'teacher':
                user = await Teacher.findById(req.params.id).populate('userInfo');
                break;
        }
        if (!user) {
            throw Error('404', 'Student not found');
        } else {
            res.render('user/view-user', { user });
        }
    } catch (error) {
        req.flash('error', userToBeViewed.charAt(0).toUpperCase() + userToBeViewed.slice(1) + " not found");
        res.status(404);
        error.message = "User Not found";
        res.render('error/error', { error });
        // res.render('error/error');
    }
}