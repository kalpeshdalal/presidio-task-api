const httpStatus = require("http-status");
const catchAsync = require("../../../utils/catchAsync");
const { sendResponse } = require("../../../utils/responseHandler");
const service = require("../service");
const pick = require("../../../utils/pick");

const update = catchAsync(async (req, res) => {
	const body = req.body;
	const { id } = pick(req.params, ["id"])

	const user = await service.updateProperty({ id, data: body})
	if (user) sendResponse(res, httpStatus.OK, "Property Updated Successfully!", null)
	else sendResponse(res, httpStatus.BAD_REQUEST, null, "Not able to update Property")
});

module.exports = update