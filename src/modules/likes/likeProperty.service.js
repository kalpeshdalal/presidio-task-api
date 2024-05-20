const httpStatus = require('http-status');
const PropertyLikes = require('./likeProperty.model');

const addPropertyLike = async ({ propertyId, userId, isLiked }) => {
    try {
        const filter = { propertyId, userId };
        const update = { isLiked };
        const options = { new: true, upsert: true };

        const result = await PropertyLikes.findOneAndUpdate(filter, update, options);

        if (!result) {
            return { status: false, data: 'Failed to add or update like.' };
        }

        return { status: true, data: result };
    } catch (error) {
        return { status: false, data: error.message };
    }
};

module.exports = {
    addPropertyLike,
};
