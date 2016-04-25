const mongoose = require('mongoose');
const Room = mongoose.model('Room');


exports.all = function(req, res) {
    // console.log(req.user);
    // Room.find({}).exec((err, rooms) => {
    //     if(!err) {
    //         res.json(rooms);
    //     } else {
    //         console.log('Error in first query');
    //     }
    // });
};

exports.get = function(req, res) {
    const query = {id: req.params.id};
    Room
        .findById(req.params.id)
        .populate({
            path: 'owner',
            select: 'profile'
        })
        .populate({
            path: 'users',
            populate: {path: 'user', select: 'profile'}
        })
        .exec((err, room) => {
             if(!err) {
                 res.json(room);
             } else {
                 console.log('Error in first query');
             }
    });
};

exports.create = function(req, res) {
    const body = req.body;

    body.owner = req.user.id;
    body.users = [{user: body.owner, charge: body.ownerCharge}];

    delete body.ownerCharge;

    if (!body.rules.free && !body.rules.charge.value) {
        return res.status(400).json({message: {'rules.charge.value': {kind: 'required'}}});
    }

    Room.create(req.body, (err, room) => {
        if (err) {
            return res.status(400).json({ message: err.errors});
        }
        return res.status(200).send({id: room._id});
    });
};

exports.remove = function(req, res) {
    // Room.findOneAndRemove(req.body, (err, data) => {
    //     if(err) console.log('Error on delete');
    //     res.status(200).send('Removed Successfully');
    // });
};

exports.update = function(req, res) {
    // var query = { id: req.params.id };
    //
    // Room.findOneAndUpdate(query, req.body, (err, data) => {
    //     if(err) console.log('Error on delete');
    //     res.status(200).send('Updated Successfully');
    // });
};
