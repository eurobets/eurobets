const mongoose = require('mongoose');
const Room = mongoose.model('Room');

function getAll(req, res) {
    Room.find({users: req.user.id}).exec((err, rooms) => {
        if(!err) {
            return res.json(rooms);
        } else {
            console.log('Error in first query');
        }
    });

}

exports.all = getAll;

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
    body.users = [body.owner];
    if (body.ownerCharge) {
        body.chargeUsers = [body.owner];
    }
    body.code = Math.random().toString(36).substr(2, 9).toUpperCase();

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

exports.addToGroupByCode = function(req, res) {
    const query = {code: req.body.code};
    Room.findOne(query, (err, room) => {
        const update = Object.assign({users: req.user.id}, !room.rules.free && {chargeUsers: req.user.id});

        Room.update(query, {$addToSet: update}, (err, data) => {
            if (err) {
                return res.status(400).json({message: err.errors});
            }

            if (data.nModified === 0) {
                return res.status(404).json({message: {code: {kind: data.n === 0 ? 'wrongCode': 'alreadyThere'}}});
            }

            return getAll(req, res);
        });
    });

    // Room.findOneAndUpdate(query, req.body, (err, data) => {
    //     if(err) console.log('Error on delete');
    //     res.status(200).send('Updated Successfully');
    // });
};
