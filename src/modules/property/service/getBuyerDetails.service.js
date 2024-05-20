const { User } = require('../../../models');
const PropertyModel = require('../property.model');

const getBuyerDetails = async (propertyId) => {
    try {
        const property = await PropertyModel.findById(propertyId);

        if (!property) {
            return { data: "Property not found", status: false, code: 404 };
        }
        const buyer = await User.findById(property.createdBy);
        if (!buyer) {
            return { data: "Buyer not found", status: false, code: 404 };
        }
        return { data: buyer, status: true, code: 200 };
    } catch (error) {
        return { data: error.message, status: false, code: 500 };
    }
};

module.exports = getBuyerDetails;
