const httpStatus = require('http-status');
const catchAsync = require("../../../utils/catchAsync");
const { sendResponse } = require("../../../utils/responseHandler");
const propertyService = require("../service");
const pick = require('../../../utils/pick');

const addProperty = catchAsync(async (req, res) => {
    const userId = req.user?._id
    const {
        city,
        area,
        noOfBedroom,
        noOfBathrooms,
        address,
        image,
        active,
    } = await pick(req.body,
        [
            "city",
            "area",
            "noOfBedroom",
            "noOfBathrooms",
            "address",
            "image",
            "active",
        ]);

    const addResult = await propertyService.addProperty({
        city,
        area,
        noOfBedroom,
        noOfBathrooms,
        address,
        image,
        createdBy: userId,
        active,
    });

    if (addResult.status) {
        sendResponse(res, httpStatus.CREATED, addResult.data, null);
    } else {
        sendResponse(res, httpStatus.BAD_REQUEST, null, addResult.data);
    }
});

module.exports = addProperty;
