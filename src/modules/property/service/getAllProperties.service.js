const mongoose = require('mongoose');
const PropertyModel = require('../property.model');
const Like = require('../../likes/likeProperty.model');

const getAllSellerProperties = async ({ userId, page = 1, limit = 10, noOfBedrooms, noOfBathrooms }) => {
    try {
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Build the query with dynamic filters
        let query = { active: true };
        if (noOfBedrooms) {
            query.noOfBedroom = noOfBedrooms;
        }
        if (noOfBathrooms) {
            query.noOfBathrooms = noOfBathrooms;
        }

        const properties = await PropertyModel.find(query);
        let fullArray = [];
        
        for (let i = 0; i < properties.length; i++) {
            const like = await Like.findOne({
                propertyId: new mongoose.Types.ObjectId(properties[i]._id),
                userId: userObjectId
            });
            const likeCount = await Like.countDocuments({
                propertyId: new mongoose.Types.ObjectId(properties[i]._id),
                isLiked: true
            });
            
            const propertyData = properties[i]?._doc || {};
            propertyData.isLikedByUser = like ? like.isLiked : false;
            propertyData.totalLikes = likeCount;

            fullArray.push(propertyData);
        }

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedArray = fullArray.slice(startIndex, endIndex);

        return { data: {data : paginatedArray, totalItems: fullArray.length}, status: true, code: 200 };
    } catch (error) {
        console.error('Error fetching properties:', error);
        return { data: error.message, status: false, code: 500 };
    }
};

module.exports = getAllSellerProperties;
