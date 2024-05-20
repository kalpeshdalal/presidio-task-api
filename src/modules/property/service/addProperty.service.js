const PropertyModel = require('../property.model');

const addProperty = async (propertyData) => {
    try {
        // const property = new PropertyModel(propertyData);
        const addResult = await PropertyModel.create({ ...propertyData });
        if (addResult) {
            return { data: addResult, status: true, code: 200 };
         }
         else {
             return { data: "Can not add property", status: false, code: 400 };
         }
    } catch (error) {
        return { data: error.message, status: false, code: 500 };
    }
};

module.exports = addProperty;
