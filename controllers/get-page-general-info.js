
const Class = require('../data-modals/class/class');
const System = require('../data-modals/system-data');
const Student = require('../data-modals/user-models/student-model');
module.exports.getPageGeneralInfo = async function (req, res, next) {
    let homePageMaterials = {}, classes = {};
    classes.staticClasses = await Class.find({ classType: 'static', putOnHomePage: true });
    classes.interactiveClasses = await Class.find({ classType: 'interactive', putOnHomePage: true });
    homePageMaterials.systemInfo = await System.findOne();
    homePageMaterials.classes = classes;
    homePageMaterials.totalFemaleStudents = (await Student.find({ gender: 'female' })).length;
    homePageMaterials.totalMaleStudents = (await Student.find({ gender: 'male' })).length;
    return homePageMaterials;
}