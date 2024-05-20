const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');
const counterIncrementor = require('../../utils/counterIncrementer');

const propertySchema = mongoose.Schema(
	{
		city: {
			type: String,
			trim: true,
			default: '',
			required: true,
		},
		area:{
			type: String,
			trim: true,
			default: '',
			required: true,
		},
		noOfBedroom:{
			type: Number,
			required: true,
		},
		noOfBathrooms:{
			type: Number,
			required: true,
		},
		address:{
			type: String,
            trim: true,
            default: '',
            required: true,
		},
		image:{
			type: String,
		},
		createdBy:{
			type: mongoose.Types.ObjectId,
		},
		active: {
			type: Boolean,
			default: true,
            required:true,
		},
		seqId: {
			type: Number
		}
		
	},
	{
		timestamps: true,
	}
);

// add plugin that converts mongoose to json
propertySchema.plugin(toJSON);
propertySchema.plugin(paginate);

propertySchema.pre('save', async function (next) {
	const property = this;

	property.seqId = await counterIncrementor('property')
	next();
});



const Property = mongoose.model('property', propertySchema);

module.exports = Property;

