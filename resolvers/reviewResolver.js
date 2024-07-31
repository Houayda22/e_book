const Review = require('../models/Review'); // Assurez-vous que le chemin est correct

const reviewQueries = {
    reviewsGetAll: async () => {
        try {
            const reviews = await Review.find().populate('user').populate('book');
            return reviews;
        } catch (error) {
            throw new Error('Error fetching reviews');
        }
    },
    reviewGetOne: async ({ id }) => {
        try {
            const review = await Review.findById(id).populate('user').populate('book');
            if (!review) throw new Error('Review not found');
            return review;
        } catch (error) {
            throw new Error('Error fetching review');
        }
    }
};

const reviewMutations = {
    reviewCreate: async ({ input }) => {
        try {
            const { userId, bookId, rating, comment } = input;
            let review = new Review({ userId, bookId, rating, comment });
            await review.save();
            review = await review.populate('user').populate('book').execPopulate();
            return review;
        } catch (error) {
            throw new Error(`Error creating review: ${error.message}`);
        }
    },
    reviewUpdate: async ({ id, input }) => {
        try {
            const review = await Review.findByIdAndUpdate(id, input, { new: true }).populate('user').populate('book');
            if (!review) throw new Error('Review not found');
            return review;
        } catch (error) {
            throw new Error('Error updating review');
        }
    },
    reviewDelete: async ({ id }) => {
        try {
            const review = await Review.findByIdAndDelete(id);
            if (!review) throw new Error('Review not found');
            return review;
        } catch (error) {
            throw new Error('Error deleting review');
        }
    }
};

module.exports = { reviewQueries, reviewMutations };
