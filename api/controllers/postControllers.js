const Post = require('../models/postModels');
const STATUS_USER_ERROR = 422;

const postCreate = (req, res) => {
	const {title, content, author} = req.body;
	const newPost = new Post({title, content, author});
	newPost.save(newPost, (err, savedPost) => {
		if(err) {
			res.status(500).json(err);
			return;
		}
		res.json(savedPost);
	});
};

const postGetAll = (req, res) => {
  Post.find({})
    .then(posts => {
      if (posts.length === 0) throw new Error();
      res.json(posts)
    })
      .catch(err => res.status(422).json(err));
};

// const postGetAll = (req, res) => {
// 	Post.find({})
// 		.select('title')
// 		.exec()
// 		.then(posts => {
// 			console.log(posts);
// 			if(posts.length === 0) throw new Error();
// 			res.json(posts);
// 		})
// 		.catch(err => {
// 			res.status(422).json(err);
// 		})
// };

const postGetById = (req, res) => {
	const {id} = req.params;
	console.log(id);
	Post.findById(id)
		.populate('author comments.author', 'username')
		.exec()
		.then((singlePost) => {
			console.log(singlePost);
			if(singlePost === null) throw new Error();
			res.json(singlePost);
		})
};

const postCommentAdd = (req, res) => {
	const {id} = req.params;
	const {author, text} = req.body;
	const comment = {author, text};
	// find a single post
	// grab comments array, add our comment to it.
	// save post
	Post.findById(id)
		.then(post => {
			if(post === null) throw new Error();
			const comments = post.comments;
			comments.push(comment);
			post
				.save()
				.then(newPost => {
					Post.findById(newPost._id)
						.populate('comments.author', 'username')
						.exec((badError, savedPost) => {
							if(badError) throw new Error();
							res.json(savedPost);
						});				
				})
				.catch(err => {
          			throw new Error();
				});
		})
		.catch(err => res.status(422).json({ error: 'No Post!' }));
};

module.exports = {
  	postCreate,
	postGetAll,
	postGetById,
	postCommentAdd
}