const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const { sendResponse } = require("../../../utils/responseHandler");
const propertyService = require("../service");

const getBuyerDetails = catchAsync(async (req, res) => {
    const propertyId = req.params.id;
    const propertyResult = await propertyService.getBuyerDetails(propertyId);

    if (propertyResult.status) {
        sendResponse(res, httpStatus.OK, propertyResult.data, null);
    } else {
        sendResponse(res, propertyResult.code, null, propertyResult.data);
    }
});

module.exports = getBuyerDetails;
