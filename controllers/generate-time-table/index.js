module.exports.generateTimeTableStudent = function (classSubjects) {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const timetable = [['subject', ...days]];

    classSubjects.forEach(subject => {
        const row = [subject.name];

        days.forEach(day => {
            const schedule = subject.schedule.find(s => s.day === day);
            if (schedule) {
                const teacherName = subject.teacher ? subject.teacher.userInfo.fullName : '';
                row.push(`${schedule.slot}  (${teacherName}`);
            } else {
                row.push('-');
            }
        });

        timetable.push(row);
    });

    return timetable;
}

// module.exports.generateTimetableTeacher = function (subjects) {
//     const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
//     const timetable = {};

//     // Initialize the timetable object
//     subjects.forEach(subject => {
//         timetable[subject.name] = {};
//         days.forEach(day => {
//             timetable[subject.name][day] = [];
//         });
//     });

//     // Fill in the timetable data
//     subjects.forEach(subject => {
//         subject.schedule.forEach(slot => {
//             const dayIndex = days.findIndex(day => day === slot.day);
//             if (dayIndex !== -1) {
//                 timetable[subject.name][slot.day].push({
//                     time: slot.slot,
//                     class: `${subject.class.classLevel}-${subject.class.section}`
//                 });
//             }
//         });
//     });

//     return timetable;
// }


// module.exports.generateTimetableTeacher = function (subjects) {
//     // Create an object to store the timetable data
//     const timetable = {};

//     // Loop through each subject and extract the relevant data
//     subjects.forEach((subject) => {
//         const classInfo = `${subject.class.classLevel}${subject.class.section}`;
//         subject.schedule.forEach((item) => {
//             if (!timetable[item.day]) {
//                 timetable[item.day] = {};
//             }
//             if (!timetable[item.day][classInfo]) {
//                 timetable[item.day][classInfo] = [];
//             }
//             timetable[item.day][classInfo].push({ time: item.slot, subject: subject.name });
//         });
//     });

//     // Create an array of arrays representing the timetable
//     const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
//     const timetableArray = Object.keys(timetable).map((day) => {
//         const dayData = [day];
//         Object.keys(timetable[day]).forEach((classInfo) => {
//             const classData = [classInfo];
//             const classSchedule = timetable[day][classInfo];
//             classSchedule.sort((a, b) => a.time.localeCompare(b.time)).forEach((item) => {
//                 classData.push(`${item.time} - ${item.subject}`);
//             });
//             dayData.push(classData);
//         });
//         return dayData;
//     });

//     // Add the days of the week as the first row
//     timetableArray.unshift(['', ...daysOfWeek]);

//     return timetableArray;
// }

module.exports.generateTimetableTeacher = function (subjects) {
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const timetable = [['-', ...daysOfWeek]]; // initialize with header row

    // initialize empty rows for each subject
    const subjectsRows = subjects.map((subject) => [subject.name]);

    // fill in the timetable with subject schedules
    subjects.forEach((subject, index) => {
        subject.schedule.forEach((schedule) => {
            const dayIndex = daysOfWeek.indexOf(schedule.day);
            subjectsRows[index][dayIndex + 1] = `${schedule.slot} _ Class ${subject.class.classLevel + ' Section ' + subject.class.section}`;
        });
    });

    // combine header row and subject rows
    return timetable.concat(subjectsRows);
}

