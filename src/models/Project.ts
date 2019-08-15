import * as mongoose from 'mongoose';

const Schem = mongoose.Schema;

const ProjectSchema = new Schem({
  name: { type: String }, 
  description: { type: String },
  createdAt: { type: Number, default: Number( new Date() ) },
  updatedAt: { type: Number, default: function(){ return this.createdAt } }
})

const Project = mongoose.model('Project', ProjectSchema);

export default Project;