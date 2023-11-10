const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const System = require('./system-data');

const UserSchema = new mongoose.Schema({
  profileImage: {
    type: String,
  },

  fullName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student',
    required: true
  },
  userProfile: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'subModel',
  },
  subModel: {
    type: String,
    required: true,
    enum: ['Admin', 'Student', 'Teacher']
  }
});



// When a user is saved then icrement the system data
UserSchema.post('save', async (user, next) => {
  let sys;
  switch (user.role) {
    case 'student':
      sys = await System.findOneAndUpdate({}, { $inc: { totalStudents: 1 } }, { new: true })
      break;
    case 'teacher':
      sys = await System.findOneAndUpdate({}, { $inc: { totalTeachers: 1 } }, { new: true })
      break;
  }
  next();
});



// pre findOneAndUpdate check if the password is updated, if so, then hash the password
// studentSchema.pre("updateOne", async function (next) {
//   try {
//     if (this._update.password) {
//       console.log(this);
//       const hashed = await bcrypt.hash(this._update.password, 10);
//       this._update.password = hashed;
//       console.log(this);
//     }
//     next();
//   } catch (err) {
//     return next(err);
//   }
// });

//The following statement will add username and password field to our schema and will make sure that the usename is unique
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model("User", UserSchema);
module.exports = User;