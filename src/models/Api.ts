
import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const ApiSchema = new Schema({
  router: { type: String, required: true },
  method: { type: String, required: true },
  belongTo: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Project' },
  tag: { type: mongoose.SchemaTypes.ObjectId, ref: 'Tag' },
  remark: { type: String },
  headers: { type: Object },
  sleep: { type: Number, default: 0 },
  req: { type: Object },
  res: { type: Object },
  noused: { type: Boolean, default: false },
  version: { type: mongoose.SchemaTypes.ObjectId, ref: 'Version' },
  createdAt: {
    type: Number, default: function () {
      return Number(new Date())
    }
  },
  updatedAt: { type: Number, default: function () { return this.createdAt } }
})

const Api = mongoose.model('Api', ApiSchema);

export default Api