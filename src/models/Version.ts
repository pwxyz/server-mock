
import mongoose from 'mongoose'

const Schema = mongoose.Schema

let name = 'Version'


const VersionSchema = new Schema({
  name: { type: String, required: true },
  belongTo: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Project' },
  parent: { type: mongoose.SchemaTypes.ObjectId || null, ref: name }
})

const Version = mongoose.model(name, VersionSchema)

export default Version

