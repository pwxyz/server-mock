
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cacheSchema = new Schema({
  projectId: { type: mongoose.SchemaTypes.ObjectId },
  version: { type: String },
  method: { type: String },
  path: { type: String },
  res: { type: Object },
  createdAt: { type: Number, default: Number(new Date()) },
  exprieIn: { type: Number, default: Number(new Date()) + 10 * 60 * 1000 },
  commonCache: { type: Boolean, default: true } //是否为常规缓存
}, { capped: { size: 1024, max: 100, autoIndexId: true }});

const cache = mongoose.model('Cache', cacheSchema);

export default cache;