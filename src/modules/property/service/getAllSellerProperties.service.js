const mongoose = require('mongoose');
const PropertyModel = require('../property.model');
const Like = require('../../likes/likeProperty.model');

const getAllSellerProperties = async ({ user }) => {
    try {
        const userObjectId = new mongoose.Types.ObjectId(user);
        const properties = await PropertyModel.aggregate([
            { $match: { createdBy: userObjectId } },
            {
                $lookup: {
                    from: Like.collection.name,
                    let: { propertyId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$propertyId', '$$propertyId'] },
                                        { $eq: ['$active', true] }
                                    ]
                                }
                            }
                        },
                        { $project: { isLiked: 1, userId: 1, _id: 0 } }
                    ],
                    as: 'likes'
                }
            },
            {
                $addFields: {
                    totalLikes: {
                        $size: {
                            $filter: {
                                input: "$likes",
                                as: "like",
                                cond: { $eq: ["$$like.isLiked", true] }
                            }
                        }
                    },
                    isLikedByUser: {
                        $anyElementTrue: {
                            $map: {
                                input: {
                                    $filter: {
                                        input: "$likes",
                                        as: "like",
                                        cond: { $eq: ["$$like.userId", userObjectId] }
                                    }
                                },
                                as: "userLike",
                                in: "$$userLike.isLiked"
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    likes: 0
                }
            }
        ]);
        return { data: properties, status: true, code: 200 };
    } catch (error) {
        console.error('Error fetching properties:', error);
        return { data: error.message, status: false, code: 500 };
    }
};

module.exports = getAllSellerProperties;
