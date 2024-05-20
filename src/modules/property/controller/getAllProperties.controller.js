const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const { sendResponse } = require("../../../utils/responseHandler");
const propertyService = require("../service");

const getAllProperties = catchAsync(async (req, res) => {
    const userId = req.params?.id;
    const { page, limit, noOfBedrooms, noOfBathrooms } = req.query;

    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);

    if (isNaN(pageInt) || isNaN(limitInt)) {
        return sendResponse(res, httpStatus.BAD_REQUEST, null, "Invalid pagination parameters");
    }
    console.log(pageInt, limitInt);
    const propertiesResult = await propertyService.getAllProperties({
        userId: userId,
        page: pageInt,
        limit: limitInt,
        noOfBedrooms: noOfBedrooms,
        noOfBathrooms: noOfBathrooms
    });

    // Check the service response and return appropriate HTTP status
    if (propertiesResult.status) {
        sendResponse(res, httpStatus.OK, propertiesResult.data, null);
    } else {
        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, propertiesResult.data);
    }
});

module.exports = getAllProperties;
