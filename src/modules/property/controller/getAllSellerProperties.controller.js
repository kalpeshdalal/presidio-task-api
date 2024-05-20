const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const { sendResponse } = require("../../../utils/responseHandler");
const propertyService = require("../service");

const getAllSellerProperties = catchAsync(async (req, res) => {
    const id = req.params.id
    const propertiesResult = await propertyService.getAllSellerProperties({user: id});

    if (propertiesResult.status) {
        sendResponse(res, httpStatus.OK, propertiesResult.data, null);
    } else {
        sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, null, propertiesResult.data);
    }
});

module.exports = getAllSellerProperties;
