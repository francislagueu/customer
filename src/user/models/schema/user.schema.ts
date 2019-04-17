import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new Schema(
  {
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String,
  },
  { timestamps: true },
);

UserSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 12);
    this.password = hashed;
    return next();
  } catch (error) {
    return next(error);
  }
});
