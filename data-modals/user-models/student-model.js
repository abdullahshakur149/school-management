const mongoose = require('mongoose');
const StudentSchema = mongoose.Schema({
    fatherName: {
        type: String,
        required: true,
    },
    DOB: {
        type: Array,
        required: true,
    },
    contact: {
        phoneNo: {
            type: String,
        },
        address: {
            country: {
                type: String,
                required: true,
            },
            streetAddress: {
                type: String,
                required: true,
            },
        },
    },
    grade: {
        type: Number,
        required: true
    },
    education: {
        instituteName: {
            type: String,
        },
        previous_grade: {
            type: String,
        },
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    },
    complaint: [mongoose.Schema.Types.ObjectId],
    recoveryQs: {
        q1: {
            type: String,
        },
        q2: {
            type: String,
        },
    },
    role: {
        type: String,
        default: "student",
        required: true,
    },
    userInfo: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    admittedClass: {
        type: mongoose.Types.ObjectId,
        ref: 'Class'
    },
    admissionDate: {
        type: Date,
    },
    admitted: {
        type: Boolean,
        default: false,
    },
    admissionRequested: {
        type: Boolean,
        default: false
    }
})


const StudentModel = mongoose.model("Student", StudentSchema);
module.exports = StudentModel;