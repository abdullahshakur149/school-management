const mongoose = require('mongoose');
const subjectSchema = new mongoose.Schema({
    name: { type: String },
    schedule: [{}],
    teacher: { type: String, ref: 'Teacher' },
    class: {
        type: mongoose.Types.ObjectId,
        ref: 'Class'
    },
    material: [{
        type: mongoose.Types.ObjectId,
        ref: 'Material'
    }],
    assignment: [{
        type: mongoose.Types.ObjectId,
        ref: 'Assignment'
    }]
});

module.exports = mongoose.model('Subject', subjectSchema);
