const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Créez des champs virtuels pour peupler les relations
reviewSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id'
});

reviewSchema.virtual('book', {
    ref: 'Book',
    localField: 'bookId',
    foreignField: '_id'
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
