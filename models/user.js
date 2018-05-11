const mongoose = require("mongoose");  
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({  
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    // In case we need to distinguish types of users in the future
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.pre("save", function (next){
    let user = this
    if(!user.isModified("password")) return next()

    bcrypt.hash(user.password, 10, function (err, hash){
        if (err) return next(err)
        user.password = hash
        next()
    })
})
userSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, function (err, isMatched){
        if(err) return callback(err)
        callback(null, isMatched)
    })
}

userSchema.methods.withoutPassword = function(){
    let user = this.toObject()
    delete user.password
    return user
}
module.exports = mongoose.model("User", userSchema);  