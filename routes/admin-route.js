const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });



const register = require('../controllers/register/register');
const renderHomePage = require('../controllers/render-home');
const isLoggedIn = require('../controllers/login/isLoggedIn');
const { getStudentWithGrade } = require('../controllers/admin/get-student');
const { getTeacherQuery } = require("../controllers/admin/getTeacher");
const { renderAddClass } = require('../controllers/class/add-class');
const { addClass } = require('../controllers/class/add-class');
const { renderAllClasses, addOrRemoveFromHomePage } = require('../controllers/class/class');
const { viewClass } = require('../controllers/class/class');
const { renderViewUser } = require('../controllers/view/view-user');
const { viewSubject } = require("../controllers/subject/subject");
const { viewAllAdmins, viewAllEnrolledStudents, viewAllStaticStudents, viewAllAdmissionRequests, viewAllTeachers } = require('../controllers/admin/view');
const { deleteAdmin } = require('../controllers/admin/delete-admin');
const catchAsync = require('../utils/catchAsync');
const { isAdmin } = require('../controllers/role');
const { addMaterialToSubject, addAssigmentToSubject, getAssignmentFile } = require('../controllers/subject/subject');



// =================--------------------------Check if the client is logged in and admin==============================================
router.use(isLoggedIn, isAdmin);

// =================--------------------------Register related routes======================================================
router
    .route("/add/admin")
    // render register form
    .get((req, res) => {
        res.render("register/register-admin");
    })
    //   render register data
    .post(catchAsync(register));




// ==================================================Home page========================================================
router.get('/', catchAsync(renderHomePage));

// ==================================================Admin Manipulate========================================================
router.get('/view/all-admins', catchAsync(viewAllAdmins));

// Delete Admin
router.get('/:id/delete', catchAsync(deleteAdmin));

// ==================================================Class Related========================================================
router.route('/add-class')
    .get(catchAsync(renderAddClass))
    .post(catchAsync(addClass))

router.get('/all-class', catchAsync(renderAllClasses))

// Add class to homepage
router.get('/class/:classId/home/', catchAsync(addOrRemoveFromHomePage));

router.get('/class/:id/view', catchAsync(viewClass));


// ==================================================Subject Related========================================================
router.get('/subject/:subjectId/view', catchAsync(viewSubject))

// ==================================================Material related=====================================================
router.post('/subject/:subjectId/material/add', upload.array("files"), catchAsync(addMaterialToSubject))

// ==================================================Student========================================================
// get student related to particular class
router.get('/get-student/with-grade/:class', catchAsync(getStudentWithGrade))
// render view student
router.get('/student/:id/view', catchAsync(renderViewUser));
// View all Enrolled students
router.get('/student/view/enrolled/all', catchAsync(viewAllEnrolledStudents));
// View All self Paced Students
router.get('/student/view/static/all', catchAsync(viewAllStaticStudents));
// View all admission requested Students
router.get('/student/view/requests/all', catchAsync(viewAllAdmissionRequests))

// ==================================================Teacher========================================================
// get Teacher related to particular course
router.get('/get-teacher', catchAsync(getTeacherQuery))
// render view Teacher
router.get('/teacher/:id/view', catchAsync(renderViewUser));
// View all teachers
router.get('/teacher/view/all', catchAsync(viewAllTeachers));



module.exports = router;