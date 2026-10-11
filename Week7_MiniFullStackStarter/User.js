const moongoose = require('mongoose');

const userSchema = new moongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, lowercase: true, trim: true},
    age: {type: Number, default: null}
},
{timestamps: true}
);

module.exports = moongoose.model('User', userSchema);