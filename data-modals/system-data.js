const mongoose = require('mongoose');
const Student = require('./user-models/student-model');
const Teacher = require('./user-models/teacher-model');
const Class = require('./class/class');

const systemSchema = mongoose.Schema({
    totalStudents: {
        type: Number
    },
    totalAdmissionedStudents: {
        type: Number,
    },
    totalTeachers: {
        type: Number
    },
    totalClasses: {
        type: Number,
    },
    totalStaticClasses: {
        type: Number
    },
    totalInteractiveClasses: {
        type: Number
    },
});

const System = mongoose.model('System', systemSchema)
module.exports = System;


// The system document will have only one instance and that instance initialized here
async function initializeSystemData() {
    if (!await System.findOne()) {
        const systemDoc = new System({
            totalStudents: (await Student.find()).length,
            totalAdmissionedStudents: (await Student.find({ admitted: true })).length,
            totalTeachers: (await Teacher.find()).length,
            totalClasses: (await Class.find()).length,
            totalStaticClasses: (await Class.find({ classType: 'static' })).length,
            totalInteractiveClasses: (await Class.find({ classType: 'interactive' })).length,
            // set other fields to their default values
        });
        await systemDoc.save();
    }
}
initializeSystemData();