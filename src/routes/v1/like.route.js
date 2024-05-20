const express = require("express");
const addLike = require("../../modules/likes/likeProperty.controller");

const  router = express.Router();

router.route('/').post( addLike);


// router.route('/get-seller-properties').get( propertyController.getAllSellerProperties)



module.exports = router;