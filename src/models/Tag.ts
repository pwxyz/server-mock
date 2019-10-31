
import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  belongTo: { type: mongoose.SchemaTypes.ObjectId, required: true },
  createdAt: {
    type: Number, default: function () {
      return Number(new Date())
    }
  },
  updatedAt: { type: Number, default: function () { return this.createdAt } }
})

const Tag = mongoose.model('Tag', TagSchema);

export default Tag