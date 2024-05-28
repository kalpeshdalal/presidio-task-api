
const PROPERTY_MODEL = require('../property.model');  

const deletePropertyServices = async ({ id }) => {
  try {
    const deletedField = await PROPERTY_MODEL.findByIdAndDelete(id);
    return deletedField;
  } catch (error) {
    console.error('Error deleting the Property:', error);
    throw new Error('Error deleting the Property');
  }
};

module.exports = deletePropertyServices
