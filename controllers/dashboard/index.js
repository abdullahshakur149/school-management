const mongoose = require('mongoose');
const User = require('../../data-modals/user');

module.exports.showStudentDashboard = async function (req, res) {
    // Note=====================
    // res.locals fills all information about student
    res.render('student/dashboard');
}