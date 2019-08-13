const mongoose = require('mongoose');

const TodoListSchema = mongoose.Schema({
    taskName: {
        type: String,
        required: true
    }
});

const Item = module.exports = mongoose.model('Item', TodoListSchema);