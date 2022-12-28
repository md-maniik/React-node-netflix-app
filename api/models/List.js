const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    type: String,
    genre: String,
    content: Array
}, {
    timestamps: true
})

module.exports = mongoose.model("List", ListSchema);