const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    name: { type: String, required: true },
    persons: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persons',
        required: true
     }
})

module.exports = mongoose.model('Tasks', taskSchema)