var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: String,
    username: {type: String, unique: true, required: true},
    password: {type: String, index: true, required: true},
    provider: String,
    providerId: String,
    providerData: {}
});

UserSchema.pre('save', 
    function(next) {
        if (this.password) {
            var md5 = crypto.createHash('md5');
            this.password = md5.update(this.password).digest('hex');
        }
        next();
    }
);

UserSchema.methods.authenticate = function(password) {
    var md5 = crypto.createHash('md5');
    md5 = md5.update(password).digest('hex');
    return this.password === md5;
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || "");
    
    _this.findOne({
        username: possibleUsername
    }, function(err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            }
            return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
        } 
        callback(null);
    }
    );
};

module.exports = mongoose.model('User', UserSchema);