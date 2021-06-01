'use strict';

const mongoose = require('mongoose');
const Room = mongoose.model('Room');
const User = mongoose.model('User');

function getAll(req, res) {
    Room.find({users: req.user.id}).exec((err, rooms) => {
        if(!err) {
            return res.json(rooms);
        } else {
            console.log('Error in first query');
        }
    });

}

function getRoomById(req, res) {
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
}

exports.all = getAll;

exports.get = getRoomById;

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

exports.removeMe = function(req, res) {
    Room
        .findByIdAndUpdate(req.params.id, {$pull: {users: req.user.id, chargeUsers: req.user.id}}, {new: true})
        .populate({
            path: 'owner',
            select: 'profile'
        })
        .populate({
            path: 'users',
            populate: {path: 'user', select: 'profile'}
        })
        .exec((err, room) => {
        if(err) {
            return res.status(400).json({message: err.errors});
        }
        return res.status(200).send(room);
    });
};
exports.removeUser = function(req, res) {
    Room
        .findByIdAndUpdate(req.params.id, {$pull: {users: req.body.userId, chargeUsers: req.body.userId}}, {new: true})
        .populate({
            path: 'owner',
            select: 'profile'
        })
        .populate({
            path: 'users',
            populate: {path: 'user', select: 'profile'}
        })
        .exec((err, room) => {
            if (err) {
                return res.status(400).json({message: err.errors});
            }
            return res.status(200).send(room);
        });
};
exports.changeMe = function(req, res) {
    let update = {};

    if (req.body.free === false) {
        update = {$addToSet: {chargeUsers: req.user.id}};
    }

    if (req.body.free === true) {
        update = {$pull: {chargeUsers: req.user.id}};
    }

    Room.findByIdAndUpdate(req.params.id, update, {new: true})
        .populate({
            path: 'owner',
            select: 'profile'
        })
        .populate({
            path: 'users',
            populate: {path: 'user', select: 'profile'}
        })
        .exec((err, room) => {
        if(err) {
            return res.status(400).json({message: err.errors});
        }
        return res.status(200).send(room);
    });
};

exports.addBot = function(req, res) {
    User
        .findOne({bot: req.body.bot})
        .exec((err, bot) => {
            Room.update({_id: req.params.id}, {$addToSet: {users: bot._id}}, (err, data) => {
                if (err) {
                    return res.status(400).json({message: err.errors});
                }

                if (data.nModified === 0) {
                    return res.status(404).json({message: {code: {kind: data.n === 0 ? 'wrongCode': 'alreadyThere'}}});
                }

                return getRoomById(req, res);
            });
        });
};

exports.addToGroupByCode = function(req, res) {
    const query = {code: req.body.code};
    Room.findOne(query, (err, room) => {
        if (err) {
            return res.status(400).json({message: err.errors});
        }
        if (room === null) {
            return res.status(404).json({message: {code: {kind: 'wrongCode'}}});
        }

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
};
