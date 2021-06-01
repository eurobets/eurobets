/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const crypto = require('crypto');

// Other oauthtypes to be added

/*
 User Schema
 */

const UserSchema = new mongoose.Schema({
    bot: String,
    email: { type: String, unique: true, lowercase: true, required: true},
    password: { type: String},
    tokens: Array,
    profile: {
        name: { type: String, required: true},
        lastName: { type: String, required: true},
        gender: { type: String, default: ''},
        location: { type: String, default: ''},
        website: { type: String, default: ''},
        picture: { type: String, default: ''}
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    google: {}
});


/**
 * Password hash middleware.
 */
UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

/*
 Defining our own custom document instance method
 */
UserSchema.methods = {
    comparePassword: function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if(err) return cb(err);
            cb(null, isMatch);
        })
    }
};

/**
 * Statics
 */

UserSchema.statics = {};


module.exports = mongoose.model('User', UserSchema);
module.exports.UserSchema = UserSchema;
