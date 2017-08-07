const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Function to check email length
let emailLengthChecker = (email) => {
    if(!email){
        return false;
    }else{
        if(email.length < 5 || email.length > 30){
            return false;
        }else{
            return true;
        }
    }
};

//Function to check valid emails
let validEmailChecker = (email) => {
    if(!email){
        return false;
    }else{
        const regExp = new 
        RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email); // Return regular expression test results (true or false)
    }

};

//Email object validator
const emailValidators = [
    {
        validator: emailLengthChecker, 
        message: 'E-mail must be at least 5 characters and no more than 30'
    },
    {
        validator: validEmailChecker,
        message: 'Must be a valid e-mail'
    }
];

//Function to check usenrmae length
let usernameLengthChecker = (username) => {
    if(!username){
        return false;
    }else{
        if(username.length < 3 || username.length > 15){
            return false;
        }else{
            return true;
        }
    }
};

//Function to check valid username
let validUsername = (username) => {
    if(!username){
        return false;
    }else{
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
};

//Username object validator
const usernameValidators = [
    {
        validator: usernameLengthChecker, 
        message: 'Username must be at least 3 characters and no more than 15'
    },
    {
        validator: validUsername,
        message: 'Username must not have any special characters'
    }
];

//Function to check password length
let passwordLengthChecker = (password) => {
    if(!password){
        return false;
    }else{
        if(password.length < 8 || password.length > 35){
            return false;
        }else{
            return true;
        }
    }
};

//Function to check valid password
let validPassword = (password) => {
    if(!password){
        return false;
    }else{
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regExp.test(password);
    }
};

//Password Object Validator
const passwordValidators = [
    {
        validator: passwordLengthChecker, 
        message: 'Password must be at least 8 characters and no more than 35'
    },
    {
        validator: validPassword,
        message: 'Password must have at least one uppercase, lowercase, special characters, and number'
    }
];

// Declaration of variables
const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true,
           validate: emailValidators },
  username: { type: String, required: true, unique: true, lowercase: true,
            validate: usernameValidators },
  password: { type: String, required: true,
            validate: passwordValidators}
});

//Schema Middleware to Encrypt Password
userSchema.pre('save', function(next) {
    if(!this.isModified('password')){
        return next();
    }
    bcrypt.hash(this.password, null, null, (err, hash)=>{
        if(err) return next(err);
        this.password = hash;
        next();
    })
});

//Methods to compare password to encrypted password upon Login
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password); //Return comparison of Login password to password in database
};

module.exports = mongoose.model('User', userSchema);