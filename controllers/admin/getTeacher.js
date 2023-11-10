const Teacher = require('../../data-modals/user-models/teacher-model');

module.exports.getTeacherQuery = async function (req, res) {
    let availableTeachers = [];
    try {
        if (!req.query.slot && !req.query.day && req.query.subject) {
            req.query.subject.toLowerCase();
            let availableDays = new Set();
            const teachers = await Teacher.find({ subjects: { $in: [req.query.subject] } }).populate('userInfo');
            for (teacher of teachers) {
                availableTeachers.push({
                    fullName: teacher.userInfo.fullName,
                    email: teacher.userInfo.email,
                    _id: teacher._id,
                    gender: teacher.gender,
                    address: teacher.address,
                    qualifications: teacher.qualification
                });
            }
            res.send(availableTeachers);
        } else if (!req.query.slot && req.query.day && req.query.subject) {
            req.query.subject.toLowerCase();
            res.send(await Teacher.find({ subjects: { $in: [req.query.subject] }, availability: { $elemMatch: { name: req.query.day } }, }).populate('userInfo'));
        }
        else if (req.query.slot && req.query.subject && req.query.day) {
            let allteachers = await Teacher.find({ subjects: { $in: [req.query.subject] } }).populate('userInfo');
            for (let teacher of allteachers) {
                for (let slot of teacher.slot_occupied) {
                    if (slot.day == req.query.day && slot.slot == req.query.slot) {
                        availableTeachers.push(teacher._id);
                    }
                }
            }
            res.send(availableTeachers);
        }
    } catch (err) {
        res.send(err);
    }
}