let mongoose = require('mongoose');


module.exports = mongoose.model('Book', {
    author : {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    UUID: {
        type: String,
        required: true
    },
    // description: {
    //   type: String,
    //   required: true
    // },
    // photo: {
    //     type: Buffer
    // },
    yearPublishing: {
        type: Number,
        required: true
    },
    addressHistory: [
        {
            country: String,
            region: String,
            city: String,
            street: String,
            house: String,
            dataLeave: Date,
            dataPickUp: Date
        }
    ],
    status: {
        type: String,
        enum: ['register', 'free', 'busy'],
        required: true
    },
    rating: {
        one: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        two: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        three: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'

            }
        ],
        four: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        five: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        six: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'

            }
        ],
        seven: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'

            }
        ],
        eight: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        nine: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        ten: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
});

