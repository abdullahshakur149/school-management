const Class = require('../../data-modals/class/class');
const Subject = require('../../data-modals/class/subject');
const Student = require('../../data-modals/user-models/student-model');
const Teacher = require('../../data-modals/user-models/teacher-model');
const System = require('../../data-modals/system-data');


module.exports.renderAddClass = async function (req, res) {
    try {
        res.render('admin/add-class');

    } catch (err) {
        req.flash('err', 'Error Occured');
        res.render('admin/error');
    }
}

module.exports.addClass = async function (req, res) {
    await addStaticOrInteractive(req, res);

    // Update the number of classes in system-data
    await System.findOneAndUpdate({}, { $inc: { totalClasses: 1 } }, { new: true });
    if (req.body.classType == 'interactive') {
        sys = await System.findOneAndUpdate({}, { $inc: { totalInteractiveClasses: 1 } }, { new: true });
    } else if (req.body.classType == 'static') {
        sys = await System.findOneAndUpdate({}, { $inc: { totalStaticClasses: 1 } }, { $inc: { totalClasses: 1 } }, { new: true });

    }
    req.flash('success', "Successfully created Class");
    res.redirect(`/admin/all-class`)

}

async function addStaticOrInteractive(req, res) {
    let students = [];
    // Create array of students
    if (req.body.students) {
        if ((typeof req.body.students.id) == 'object') {
            req.body.students = Object.values(req.body.students);
            if (req.body.students[0].length > 1) {
                for (let student of req.body.students[0]) {
                    students.push(student);
                }
                req.body.students = students;

            }
        } else {
            req.body.students = Object.values(req.body.students);
        }
    }
    if (req.body.subjects) {
        req.body.subjects = Object.values(req.body.subjects);
    }
    let cls = new Class({ ...req.body });

    // add class id to each student and also add admission date
    if (req.body.students) {
        for (let id of req.body.students) {
            const upd = await Student.findByIdAndUpdate(id, { admitted: true, admittedClass: cls._id, admissionDate: Date.now() });
        }
    }
    if (req.body.subjects) {
        for (let subject of req.body.subjects) {
            let sub = new Subject({ ...subject });
            // Associate subject with class
            sub.class = cls._id;

            cls.courses.push(sub._id);
            let slots = [];
            for (let day in subject.schedule) {
                slots.push({ day: day, slot: subject.schedule[day].slot });
            }
            sub.schedule = slots;

            sub = await sub.save();
            // Also add subject and schedule to teacher
            updateTeacher(sub._id, sub.teacher, slots);
        }
    }
    await cls.save();
}

async function updateTeacher(courseID, teacherID, schedule) {
    try {
        await Teacher.findByIdAndUpdate(teacherID, { $push: { assigned_subjects: courseID, slot_occupied: schedule } });
    } catch (err) {
        throw Error(404, 'Selected Teacher not found');
    }
}
