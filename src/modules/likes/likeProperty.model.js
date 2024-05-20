const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');
const counterIncrementor = require('../../utils/counterIncrementer');

const likesSchema = mongoose.Schema(
	{
		propertyId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        userId:{
            type: mongoose.Types.ObjectId,
            required: true
        },
        isLiked:{
            type: Boolean,
            default: false,
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
likesSchema.plugin(toJSON);
likesSchema.plugin(paginate);

likesSchema.pre('save', async function (next) {
	const like = this;

	like.seqId = await counterIncrementor('like')
	next();
});



const Like = mongoose.model('like', likesSchema);

module.exports = Like;

