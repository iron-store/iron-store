const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    role: {
        type : String,
        enum : ['USER', 'ADMIN'],
        default : 'USER',
    }
},
{
    timestamps: { 
        createdAt: "created_at",
        updatedAt: "updated_at" 
    }
});

module.exports = mongoose.model('User', userSchema);

