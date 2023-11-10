const mongoose = require('mongoose');
const TeacherSchema = mongoose.Schema({
    subjects: {
        type: [String],
        required: true
    },
    address: {
        type: String,
    },
    phoneNo: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
    },
    // availability: {
    //     type: [Object],
    // },
    qualification: [{
        name: {
            type: String,
            required: true
        },
        issuingAuthority: {
            type: String,
            required: true
        },
    }],
    teachingExperience: [{
        subName: {
            type: String,
            required: true
        },
        grade: {
            type: String,
            required: true
        },
        institution_name: {
            type: String,
            required: true
        },
    }],
    reviews: [{
        studentName: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    profilePictureUrl: {
        type: String,
    },
    userInfo: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    },
    assigned_subjects: [{ type: mongoose.Types.ObjectId, ref: 'Subject' }],
    slot_occupied: [{
        day: {
            type: String,
        },
        slot: {
            type: String
        }
    }],
})

// adding a post delete middleware to student schema so that it could run before deleting some student
TeacherSchema.post("findOneAndDelete", async function (deletedHostellite, next) {
    //   //Delete any associated files
    //   if (deletedHostellite.profileImage) {
    //     fs.unlink("public/hostel-files/hostellite-profile-images/" + deletedHostellite.profileImage, (err) => {
    //       if (err) {
    //         throw err;
    //       }
    //     });
    //   }

    //   // Delete any complaints
    //   if (deletedHostellite.complaint.length) {
    //     for (complaintId of deletedHostellite.complaint) {
    //       await Complaint.findByIdAndDelete(complaintId);
    //     }
    //   }
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


const TeacherModel = mongoose.model("Teacher", TeacherSchema);
module.exports = TeacherModel;