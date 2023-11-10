const Class = require('../../data-modals/class/class');
const Subject = require('../../data-modals/class/subject');
const Material = require('../../data-modals/class/material');
const SubjectFile = require('../../data-modals/class/subjectFile');
const Assignmnent = require('../../data-modals/class/assignment');
const mime = require('mime-types')

module.exports.viewSubject = async function (req, res) {
    const subject = await Subject.findById(req.params.subjectId);
    const cls = await Class.findById(subject.class).populate([
        {
            path: 'courses',
            match: { _id: subject._id },
            populate: [
                {
                    path: 'teacher',
                    populate: { path: 'userInfo' }
                },
                {
                    path: 'material',
                    select: ['materialDetail', 'materialTitle', 'createdAt', 'files.filename', 'files.id'],
                },
                {
                    path: 'assignment',
                    select: ['assignmentDetail', 'assignmentTitle', 'createdAt', 'dueDate', 'assignmentType', 'totalPoints', 'files.filename', 'files.id'],
                },
            ],
        },
        {
            path: 'students',
            populate: { path: 'userInfo' }
        }
    ]);
    cls.courses[0].material = cls.courses[0].material.reverse();
    cls.courses[0].assignment = cls.courses[0].assignment.reverse();
    if (cls.classType == 'interactive') {
        res.render('subject/view-subject', { cls });
    } else {
        res.render('subject/view-static-subject', { cls });
    }
}

module.exports.addMaterialToSubject = async function (req, res) {
    let material = await new Material({ ...req.body });
    let file;
    for (let file of req.files) {
        file = await new SubjectFile({
            filename: file.originalname,
            data: file.buffer
        })
        await file.save();
        material.files.push({ filename: file.filename, id: file._id });
    }
    material.subject = req.params.subjectId;
    // save object id of material in subject
    await Subject.findByIdAndUpdate(req.params.subjectId, { $push: { material: material._id } });
    await material.save();
    req.flash('success', 'Successfully added new material to class');
    res.redirect(`/${req.user.role}/subject/${req.params.subjectId}/view`)
}

module.exports.addAssigmentToSubject = async function (req, res) {
    let assignment = await new Assignmnent({ ...req.body });

    // Save files if there are any
    for (let file of req.files) {
        file = await new SubjectFile({
            filename: file.originalname,
            data: file.buffer
        })
        await file.save();
        assignment.files.push({ filename: file.filename, id: file._id });
    }
    assignment.subject = req.params.subjectId;
    // save object id of assignment in subject
    await Subject.findByIdAndUpdate(req.params.subjectId, { $push: { assignment: assignment._id } });
    await assignment.save();
    req.flash('success', 'Successfully added new assignment to class');
    res.redirect(`/teacher/subject/${req.params.subjectId}/view`)
}

module.exports.getMaterial = async function (req, res) {
    const fileId = req.params.materialId;

    try {
        // Find the file by its ID
        const file = await Material.findById(fileId);

        if (!file) {
            res.status(404).send('File not found');
            return;
        }

        // Set the appropriate response headers
        res.set({
            'Content-Type': file.contentType,
            'Content-Disposition': 'inline',
        });

        // Send the file contents as the response body
        res.send(file.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

// get File related to some particular subject
module.exports.getSubjectFile = async function (req, res) {
    const file = await SubjectFile.findById(req.params.fileId);

    // Get the content type based on the file extension
    const contentType = mime.lookup(file.filename);

    // Set the headers for the response
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);

    // Send the file data to the response
    res.send(file.data);
}

// get File related to some particular subject
module.exports.getAssignmentFile = async function (req, res) {
    const file = await SubjectFile.findById(req.params.fileId);

    // Get the content type based on the file extension
    const contentType = mime.lookup(file.filename);

    // Set the headers for the response
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);

    // Send the file data to the response
    res.send(file.data);
}