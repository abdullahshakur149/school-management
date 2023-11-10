const express = require("express");
const router = express.Router();
const configurePassport = require("../controllers/passport/configure-passport");
const passport = require("passport");
const multer = require("multer");

const register = require('../controllers/register/register');
const renderHomePage = require('../controllers/render-home');
const { viewClass } = require('../controllers/class/class')
const { viewSubject } = require('../controllers/subject/subject');
const { addMaterialToSubject, addAssigmentToSubject, getAssignmentFile } = require('../controllers/subject/subject');
const { getMaterial } = require('../controllers/subject/subject');
const { getSubjectFile } = require('../controllers/subject/subject');
const postLogin = require('../controllers/login/login')
const isLoggedIn = require('../controllers/login/isLoggedIn');
const catchAsync = require("../utils/catchAsync");
const { isTeacher } = require('../controllers/role');

const storage = multer.memoryStorage();
const upload = multer(
    {
        storage: storage,
        dest: 'uploads/', // Destination folder for uploaded files
        limits: {
            fileSize: 10000000, // Maximum file size (in bytes)
            files: 10 // Maximum number of files
        }
    }
);



// =================--------------------------Register related routes======================================================
router
    .route("/register")
    // render register form
    .get((req, res) => {
        res.render("register/register-teacher");
    })
//   render register data
router.post('/create', register);


router.use(isLoggedIn, isTeacher);


// ==================================================Home page========================================================
router.get('/', catchAsync(renderHomePage));


// =================--------------------------Class related routes======================================================
router.get('/class/:id/view', catchAsync(viewClass));

// =================--------------------------Subject related routes======================================================
router.get('/subject/:subjectId/view', catchAsync(viewSubject))


// ====================================================Material Route==============================================
router.post('/subject/:subjectId/material/add', upload.array("files"), catchAsync(addMaterialToSubject))
router.get('/subject/:subjectId/material/:materialId/get', catchAsync(getMaterial));


// ====================================================Assignmnent Route==============================================
router.post('/subject/:subjectId/assignment/add', upload.array("files"), catchAsync(addAssigmentToSubject))


// ====================================================File Route==============================================
router.get('/subject/:subjectId/material/:materialId/file/:fileId/view', catchAsync(getSubjectFile));
router.get('/subject/:subjectId/assignment/:assignmentId/file/:fileId/view', catchAsync(getAssignmentFile));
module.exports = router;