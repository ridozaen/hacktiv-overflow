const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


const userSchema = Schema({
    username: { type: String, required: true },
    role: {type: String, default: 'user'},
    password: { type: String, required: true, minlength : [6, 'Password minimun 6 character'], match: [/(?=.*?[0-9])/,'The Password must contain at least 1 numeric character'], select: false },
    email: { type: String, lowercase: true, required: true, unique: true, match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email is invalid!'] }
},
    {
        timestamps: true
    });

userSchema.plugin(uniqueValidator);

// middleware : hash the password before save into db
userSchema.pre('save', function (next) {
    let user = this;
    //only hash the password if it has been modifed or is new
    if (!user.isModified('password')) return next();

    //generate salt
    bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });

})

//instance method password compare 
userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return callback(err);
        callback(null,isMatch)
    })
}

module.exports = mongoose.model('User', userSchema);