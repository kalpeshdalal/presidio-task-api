const httpStatus = require('http-status');
const catchAsync = require("../../utils/catchAsync");
const { sendResponse } = require("../../utils/responseHandler");
const pick = require('../../utils/pick');
const { addPropertyLike } = require('./likeProperty.service');

const addLike = catchAsync(async (req, res) => {
    const {
        propertyId,
        userId,
        isLiked,
    } = await pick(req.body,
        [
            "propertyId",
            "userId",
            "isLiked",
        ]);

    const addResult = await addPropertyLike({
        propertyId,
        userId,
        isLiked,
    });

    if (addResult.status) {
        sendResponse(res, httpStatus.CREATED, addResult.data, null);
    } else {
        sendResponse(res, httpStatus.BAD_REQUEST, null, addResult.data);
    }
});

module.exports = addLike;
