import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number },
    isActive: { type: Boolean, default: true },
    role: { type: String, default: 'user' },
    permissions: [{ type: String }]
  },
  {
    timestamps: true ,
    versionKey: false,
  }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
