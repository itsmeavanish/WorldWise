const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique:true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePhoto:{
      type:String,
    }
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);
// Method to match passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password before saving (if password is being updated)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
