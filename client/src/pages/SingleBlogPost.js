import React, { Component } from 'react';
import axios from 'axios';

import { Comment } from './Comment';

export default class SingleBlogPost extends Component {
  constructor() {
    super();
    this.state = {
      post: {
        title: 'This is a FAKE blog post title', 
        _id: '234lj23kjh', 
        author: 'Patrick Saves the Day',
        content: 'This is some FAKE content', 
        comments: [
          {text:'This is a FAKE comment', author: 'Stanley Yelnats'},
        ]},
      comment: '',
    };
    this.handleCommentText = this.handleCommentText.bind(this);
    this.addComment = this.addComment.bind(this);
  }
  
  componentDidMount() {
    this.getBlogPost()
  }

  getBlogPost(){
    const { id } = this.props.match.params
    axios.get(`http://localhost:3030/posts/${id}`)
      .then((data) => {
        // console.log("data: " + JSON.stringify(data))
        this.setState({post: data.data});
      })
      .catch((err) => {
        console.log('You are seeing this error because you have yet to implement the `post` to get single post', err );
      });
  }
  
  addComment(e) {
    e.preventDefault();
    const { comment } = this.state;
    const { id } = this.props.match.params;
    const newComment = {
      text: comment,
      author: localStorage.getItem('uuID'),
    };
    this.setState({comment: ''});
    axios.put(`http://localhost:3030/posts/${id}`, newComment)
      .then((data) => {
        setTimeout(() => {
          this.getBlogPost();
        }, 200);
      })
      .catch((err) => {
        console.log('Something went wront with your "UPDATE" method on `posts/:id`')
      })
  }
  
  handleCommentText(e) {
    this.setState({comment: e.target.value});
  }

  render() {
    const { title, comments, content, author } = this.state.post;
    return (
      <div>
        <h4>{title}</h4>
        <h5>{author.username}</h5>
        <div>{content}</div>
        {comments.map((comment, ind) => {
          return <Comment comment={comment} key={ind} />
        })}
        <p>Add comments</p>
        <form onSubmit={this.addComment}>
          <textarea 
            onChange={this.handleCommentText}
            value={this.state.comment}
            placeholder="add comment"
          />
          <br/>
          <button className="btn btn-default btn-sm" type="submit" onClick={this.addComment}>Submit Comment</button>
        </form>
      </div>
    );
  }
}

