
import * as mongoose from 'mongoose'


const Schema = mongoose.Schema;

const ApiSchema = new Schema({
  router: { type: String, required: true },
  method: { type: String, required: true },
  belongTo: { type: mongoose.SchemaTypes.ObjectId, required: true },
  headers: { type: Object },
  req: { type:Object },
  res: { type: Object },
  createdAt: { type: Number, default: Number(new Date()) },
  updatedAt: { type: Number, default: function(){ return this.createdAt } }
})

const Api = mongoose.model('Api', ApiSchema);

export default Api