const Class = require('../../data-modals/class/class');
module.exports.renderAllClasses = async function (req, res) {
    const allClss = await Class.find().populate([
        { path: 'courses' },
        { path: 'students' }
    ]);
    res.render('admin/all-class', { allClss });
}

module.exports.viewClass = async function (req, res) {
    try {
        const cls = await Class.findById(req.params.id).populate([
            { path: 'courses', populate: { path: 'teacher', populate: { path: 'userInfo' } } },
            { path: 'students', populate: { path: 'userInfo' } }
        ]);
        res.render('class/view-class', { cls });
    } catch (err) {
        req.flash('error', 'Wrong class Id');
        res.render('error/error')
    }
}

module.exports.addOrRemoveFromHomePage = async function (req, res) {
    let cls;
    switch (req.query.add) {
        case 'true':
            cls = await Class.findByIdAndUpdate(req.params.classId, { putOnHomePage: true });
            res.status(200).json({ added: true, message: 'This class will now be available in the homepage under classes tap of navbar' });
            break;
        case 'false':
            cls = await Class.findByIdAndUpdate(req.params.classId, { putOnHomePage: false });
            res.status(200).json({ removed: true, message: 'This class is removed from homepage under classes tap of navbar' });
            break;
    }
}