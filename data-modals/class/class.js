const mongoose = require('mongoose');
var System = require('../system-data');



const classSchema = new mongoose.Schema({
    classType: {
        type: String,
        enum: ['interactive', 'static'],
        required: true
    },
    classLevel: {
        type: Number,
        min: 1,
        max: 12,
        required: true
    },
    section: {
        type: String,
        enum: ['Pink', 'Blue', 'Bird', 'Rose', 'Red']
    },
    classID: { type: String },
    students: [{ type: mongoose.Types.ObjectId, ref: 'Student' }],
    courses: [{ type: mongoose.Types.ObjectId, ref: 'Subject' }],
    created: {
        type: Date,
        default: Date.now,
    },
    putOnHomePage: {
        type: Boolean,
        default: false
    }
});



module.exports = mongoose.model('Class', classSchema);


