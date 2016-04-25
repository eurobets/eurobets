const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    users: [{user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, charge: {type: Boolean, default: true}}],
    dateCreated: {type: Date, default: Date.now},
    rules: {
        free: {type: Boolean, default: false},
        points: {
            score: {type: Number, required: true},
            difference: {type: Number, required: true},
            result: {type: Number, required: true}
        },
        charge: {
            value: {type: Number},
            currency: {type: String}
        }
    }
});

module.exports = mongoose.model('Room', RoomSchema);

