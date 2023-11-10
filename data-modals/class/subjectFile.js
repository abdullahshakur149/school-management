
const mongoose = require('mongoose');
const subjectFileSchema = new mongoose.Schema({
    filename: String,
    data: Buffer
})

module.exports = mongoose.model('SubjectFile', subjectFileSchema);
