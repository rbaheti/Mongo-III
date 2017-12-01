const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const PostSchema = new mongoose.Schema({
	title: {
	    type: String,
	    required: true
	},
	content: {
  		type: String,
    	required: true
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	comments: [CommentSchema]
	// author: {
	//   	name: {
	//   		type: String,
	//     	required: true
	//     },
	//     _id: {
	//     	type: mongoose.Schema.Types.ObjectId,
	//     	required: true
	//     }
	// },
	//comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('Post', PostSchema);
