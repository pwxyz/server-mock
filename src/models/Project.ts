
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;


const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  version: {
    type: Array,
    default: ['v0.0.1']
  },
  createdAt: {
    type: Number,
    default: Number(new Date())
  },
  updatedAt: {
    type: Number, default: function() {
      return this.createdAt;
    }
  }
});


const Project = mongoose.model('Project', projectSchema);



export default Project;