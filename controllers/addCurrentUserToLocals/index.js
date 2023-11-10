
module.exports.addCurrentUserToLocals = async function (req, res, next) {
    res.locals.currentUser = undefined;
    if (req.user) {
        res.locals.currentUser = req.user;
        if (req.user.role == 'student') {
            res.locals.student = await require('../../data-modals/user').findById(req.user._id)
                .populate([
                    {
                        path: 'userProfile',
                        populate: {
                            path: 'admittedClass',
                            populate: {
                                path: 'courses', populate: [{ path: 'assignment' }, { path: 'material' }], select: ['-students']
                            }
                        }
                    }
                ])
        }
    }
    next();
}