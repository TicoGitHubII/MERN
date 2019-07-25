const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const DataSchema = new Schema(
    {
        id: Number,
        message: String
    },
    { timestamps: true }
);

//export the new Schema so we  could modify if using Node.js
module.exports = mongoose.model("Data", DataSchema);