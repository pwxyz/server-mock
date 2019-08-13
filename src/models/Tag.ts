import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tagSchem = new Schema({
  name: { type: String },
  keys: { type: String },
  blongTo: { type: mongoose.SchemaTypes.ObjectId },
  version: { type: String },
  oldVersionId: { type: mongoose.SchemaTypes.ObjectId, default: null },
  createdAt: { type: Number, default: Number(new Date()) },
  updatedAt: {
    type: Number, default: function() {
      return this.createdAt;
    }
  }
});

const Tag = mongoose.model('Tag', tagSchem);

export default Tag;