const Class = require('../../data-modals/class/class');
const { generateTimeTableStudent } = require('../../controllers/generate-time-table');
module.exports.viewStaticClass = async function (req, res) {
    const cls = await Class.findById(req.params.classId).populate([
        {
            path: 'courses',
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
    ]);
    res.render('class/overview-static-class', { cls });
}

module.exports.viewInteractiveClass = async function (req, res) {
    const cls = await Class.findById(req.params.classId).populate([
        {
            path: 'courses',
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
    ]);
    cls.table = generateTimeTableStudent(cls.courses);
    res.render('class/overview-interactive-class', { cls });
}
















// function generateScheduleTable(data) {
//     const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

//     // Create a mapping of subjects to their schedule
//     const scheduleMap = {};
//     data.forEach(subject => {
//         const schedule = subject.schedule;
//         schedule.forEach(sched => {
//             const day = sched.day;
//             const slot = sched.slot;
//             if (!scheduleMap[subject.name]) {
//                 scheduleMap[subject.name] = {};
//             }
//             scheduleMap[subject.name][day] = slot;
//         });
//     });

//     // Create the array of objects
//     const scheduleTable = [];
//     scheduleTable.push(['', ...daysOfWeek]); // Add header row
//     Object.keys(scheduleMap).forEach(subject => {
//         const row = [subject];
//         daysOfWeek.forEach(day => {
//             const slot = scheduleMap[subject][day];
//             row.push(slot || '-');
//         });
//         scheduleTable.push(row);
//     });

//     return scheduleTable;
// }



module.exports.viewAllClasses = async function (req, res) {
    let cls;
    // respond with data depending upon whether the request if for all interacive classes or all static classes
    switch (req.originalUrl.split('/')[4]) {
        case 'interactive':
            clss = await Class.find({ classType: 'interactive' }).populate([
                {
                    path: 'courses',
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
            ]);
            res.render('class/overview-all-interactive', { clss });
            break;
        case 'static':
            clss = await Class.find({ classType: 'static' }).populate([
                {
                    path: 'courses',
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
            ]);
            res.render('class/overview-all-static', { clss });
            break;

    }
}