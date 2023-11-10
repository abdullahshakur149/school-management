const Admin = require('../../data-modals/user-models/admin-model');
const Student = require('../../data-modals/user-models/student-model');
const Teacher = require('../../data-modals/user-models/teacher-model');

module.exports.viewAllAdmins = async function (req, res) {
    let allAdmins = await Admin.find().populate('userInfo');
    res.render('admin/view-all-admins', { allAdmins });
}

module.exports.viewAllEnrolledStudents = async function (req, res) {
    let allStudents = await Student.find({ admitted: true }).populate([
        { path: 'userInfo' },
        { path: 'admittedClass' }
    ]);
    res.render('student/view-all-students', { allStudents });
}

module.exports.viewAllStaticStudents = async function (req, res) {
    let allStudents = await Student.find({ admitted: false, admissionRequested: false }).populate([
        { path: 'userInfo' },
        { path: 'admittedClass' }
    ]);
    res.render('student/view-all-students', { allStudents });
}


module.exports.viewAllAdmissionRequests = async function (req, res) {
    let allStudents = await Student.find({ admitted: false, admissionRequested: true }).populate([
        { path: 'userInfo' },
        { path: 'admittedClass' }
    ]);
    res.render('student/view-all-students', { allStudents });
}

// View all Teachers
module.exports.viewAllTeachers = async function (req, res) {
    let allTeachers = await Teacher.find().populate([
        { path: 'userInfo' },
        { path: 'assigned_subjects', populate: { path: 'class' } }
    ]);
    res.render('teacher/view-all-teachers', { allTeachers });
}
