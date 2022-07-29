import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    name: String,
    title: {
        type:String,
        required: [true, "Pas de titre"]
    },
    description: {
        type: String,
        required: [true, "pas de description"]
    },
    link: {
        type: String,
        required: [true, "pas de lien"]
    },
    image:{
        type:String,
        default: "test.png"
    }
})

const ProjectModel = mongoose.model('projects', projectSchema)
export default ProjectModel