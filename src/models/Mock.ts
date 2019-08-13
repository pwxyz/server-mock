
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mockSchema = new Schema({
  blongTo: { type: mongoose.SchemaTypes.ObjectId },
  version: { type: String },
  method: { type: String },
  path: { type: String },
  arg: { type: Array },
  res: { type: Object }
});

const Mock = mongoose.model('Mock', mockSchema);

export default Mock;