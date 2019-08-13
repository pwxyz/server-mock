
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

//kind 根据此类型生成模拟数据,在res中

const apiSchem = new Schema({
  path: { type: String },
  method: { type: String },
  tag: {
    name: { type: String },
    keys: { type: String },
    id: { type: mongoose.SchemaTypes.ObjectId }
  },  //tagid
  version: { type: String },
  blongTo: { type: mongoose.SchemaTypes.ObjectId },
  req: [{
    in: { type: String },
    name: { type: String },
    require: { type: Boolean },
    type: { type: String },
    description: { type: String },
    // kind: { type: String }
  }],
  res: {
    type: Object
  },
  createdAt: { type: Number, default: Number(new Date()) },
  updatedAt: {
    type: Number, default: function() {
      return this.createdAt;
    }
  }
});

const Api = mongoose.model('Api', apiSchem);


export default Api;