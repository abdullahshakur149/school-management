const Class = require('../data-modals/Class');
const Student = require('../data-modals/Student');
const Subject = require('../data-modals/class/subject');

const classSeedData = [
    {
        classType: 'interactive',
        classLevel: 7,
        section: 'Blue',
        classID: '7-Blue',
        students: [],
        courses: [],
    },
    {
        classType: 'static',
        classLevel: 9,
        section: 'Bird',
        classID: '9-Bird',
        students: [],
        courses: [],
    },
    {
        classType: 'interactive',
        classLevel: 12,
        section: 'Red',
        classID: '12-Red',
        students: [],
        courses: [],
    },
];

const studentSeedData = [
    {
        name: 'John Doe',
        age: 15,
        email: 'john.doe@example.com',
    },
    {
        name: 'Jane Smith',
        age: 14,
        email: 'jane.smith@example.com',
    },
    {
        name: 'Bob Johnson',
        age: 16,
        email: 'bob.johnson@example.com',
    },
];

const subjectSeedData = [
    {
        name: 'Mathematics',
        code: 'MATH',
    },
    {
        name: 'English Language',
        code: 'ENG',
    },
    {
        name: 'Chemistry',
        code: 'CHEM',
    },
];

// Populating the students array of a class
Class.findOne({ classID: '7-Blue' })
    .then((classDoc) => {
        classDoc.students.push(studentSeedData[0], studentSeedData[1]);
        return classDoc.save();
    })
    .then((updatedClass) => console.log(updatedClass))
    .catch((err) => console.error(err));

// Populating the courses array of a class
Class.findOne({ classID: '9-Bird' })
    .then((classDoc) => {
        classDoc.courses.push(subjectSeedData[0], subjectSeedData[1]);
        return classDoc.save();
    })
    .then((updatedClass) => console.log(updatedClass))
    .catch((err) => console.error(err));

// Creating new student and adding to a class
const newStudent = new Student({
    name: 'Sarah Lee',
    age: 13,
    email: 'sarah.lee@example.com',
});

Class.findOne({ classID: '9-Bird' })
    .then((classDoc) => {
        classDoc.students.push(newStudent);
        return classDoc.save();
    })
    .then((updatedClass) => console.log(updatedClass))
    .catch((err) => console.error(err));

// Creating new course and adding to a class
const newCourse = new Subject({
    name: 'Physics',
    code: 'PHY',
});

Class.findOne({ classID: '12-Red' })
    .then((classDoc) => {
        classDoc.courses.push(newCourse);
        return classDoc.save();
    })
    .then((updatedClass) => console.log(updatedClass))
    .catch((err) => console.error(err));
