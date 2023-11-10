const User = require("../../data-modals/user");
const Student = require('../../data-modals/user-models/student-model');
const Teacher = require('../../data-modals/user-models/teacher-model');
const Admin = require('../../data-modals/user-models/admin-model');
const fs = require("fs");
const Joi = require('joi');

async function register(req, res) {
    let newUser;
    if ((await User.findOne({ email: req.body.email })) == null) {
        try {
            let std = await User({ ...req.body });
            switch (req.body.role) {
                case 'admin':
                    newUser = Admin({ ...req.body })
                    std.subModel = 'Admin'
                    break;
                case 'teacher':
                    // console.log(Object.values(req.body.day));
                    req.body.qualification = Object.values(req.body.qualification);
                    req.body.teachingExperience = Object.values(req.body.teachingExperience);
                    // req.body.availability = []
                    // for (let day of Object.values(req.body.day)) {
                    //     req.body.availability.push({ name: day[0], slot: day[1].slot });
                    // }
                    newUser = Teacher({ ...req.body });
                    std.subModel = 'Teacher'
                    break;
                default:
                    newUser = Student({ ...req.body });
                    std.subModel = 'Student';
                    break;
            }
            std.userProfile = newUser._id;

            newUser.userInfo = std._id;
            await newUser.save();
            std = await User.register(std, req.body.password);

            // Login the newly created user if it is not admin
            if (req.body.role != 'admin') {
                req.login(std, (err) => {
                    if (err) {
                        req.flash('error', "Error occured while logging in");
                        res.redirect("/" + req.body.role + "/login");
                    } else {
                        req.flash("success", "Welcome!!!");
                        const redirectUrl = req.session.returnTo || "/" + req.body.role;
                        delete req.session.returnTo;
                        res.redirect(redirectUrl);
                    }

                })
            }
            else {
                req.flash('success', 'successfully added new admin');
                res.redirect('/admin/view/all-admins');
            }
        } catch (err) {
            req.flash("error", err.message + " (You may have left some of the fields empty)");
            res.status(403);
            res.redirect("/" + req.body.role + "/register");
        }

    } else {
        req.flash("error", req.body.role + " with the provided email '" + req.body.email + "' is already registered");
        res.redirect("/" + req.body.role + "/register");
    }
}

module.exports = register;