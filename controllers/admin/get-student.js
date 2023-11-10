const Student = require('../../data-modals/user-models/student-model');
module.exports.getStudentWithGrade = async function (req, res) {
    try {
        let notAdmittedStudents = [];
        let students = await Student.find({ grade: req.params.class }).populate('userInfo');
        for (let student of students) {
            if (!student.admittedClass) {
                notAdmittedStudents.push(student);
            }
        }
        res.send(notAdmittedStudents);
    } catch (err) {
        res.send(err.message);
    }
}