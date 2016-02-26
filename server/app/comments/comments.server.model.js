var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var CommentsSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [{
        type: Schema.Types.ObjectId, ref: 'User',
        unique: true
    }],
    role: {
        type: String,
        enum: ['Truck', 'User', 'Admin']
    },

    truck: {
        truckName: String,
        address: String,
        phone: String,
        currentLocation: { type: [Number] }, // --> **** NOTE **** MONGOOSE REQUIRES [LONG, LAT] FORMAT // GOOGLE MAPS REQUIRES OPPOSITE [LAT, LONG] //
        genre: { type: String, enum: ['Mexican', 'Thai', 'American', 'Other'] },
        price: { type: String, enum: ['$', '$$', '$$$', '$$$$'] },
        createdAt: { type: Date, default: Date.now },
        updatedAt_readable: String,
        website: String,
        imgUrl: String,
        description: String, 
        status: { type: String }
    }
});

module.exports = mongoose.model('Comments', CommentsSchema);
