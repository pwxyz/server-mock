import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  password: { type: String },
  createdAt: {
    type: Number, default: function () {
      return Number(new Date())
    }
  },
  updatedAt: { type: Number, default: function () { return this.createdAt } }
})

const User = mongoose.model('User', UserSchema);

export default User



