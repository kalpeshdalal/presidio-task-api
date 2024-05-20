const PropertyModel = require('../property.model');

const getPropertyById = async (propertyId) => {
    try {
        const property = await PropertyModel.findById(propertyId);
        if (!property) {
            return { data: "Property not found", status: false, code: 404 };
        }

        return { data: property, status: true, code: 200 };
    } catch (error) {
        return { data: error.message, status: false, code: 500 };
    }
};

module.exports = getPropertyById;
