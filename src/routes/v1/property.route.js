const express = require("express");
const propertyController = require("../../modules/property/controller")
const auth = require('../../middlewares/auth');

const  router = express.Router();

router.route('/').post( auth('seller'),propertyController.addProperty);
router.route('/:id').get( propertyController.getAllProperties);
router.route('/get-specific/:id').get( propertyController.getPropertyById);
router.route('/get/:id').get(propertyController.getAllSellerProperties);
router.route('/get-seller-details/:id').get( propertyController.getBuyerDetails);

module.exports = router;