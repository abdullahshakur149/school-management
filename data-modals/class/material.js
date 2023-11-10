const mongoose = require('mongoose');
const materialSchema = new mongoose.Schema({
    materialDetail: { type: String },
    materialTitle: { type: String },
    teacher: { type: mongoose.Types.ObjectId, ref: 'Teacher' },
    subject: {
        type: mongoose.Types.ObjectId, ref: 'Subject'
    },
    files: [{
        filename: String,
        id: {
            type: mongoose.Types.ObjectId,
            ref: 'SubjectFile'
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Material', materialSchema);
