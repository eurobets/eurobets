const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    code: {type: String, required: true},
    name: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    chargeUsers: [String],
    dateCreated: {type: Date, default: Date.now},
    rules: {
        free: {type: Boolean, default: false},
        points: {
            finalsCoefficient: {type: Number, default: 1},
            score: {type: Number, required: true},
            difference: {type: Number, required: true},
            result: {type: Number, required: true},
            promotion: {type: Number, required: true}
        },
        charge: {
            value: {type: Number},
            currency: {type: String},
            hosting: {type: Number}
        }
    }
});

module.exports = mongoose.model('Room', RoomSchema);

