import React, { Component } from 'react';
import { upvotePost, downvotePost, updatePost, setPost, updateComment} from '../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Form, TextArea} from 'semantic-ui-react'



class PostEdit extends Component {

  state = {
    author: this.props.post.author,
    title: this.props.post.title,
    category: this.props.post.category,
    body: this.props.post.body,
    commentCount: this.props.post.commentCount,
    deleted: this.props.post.deleted,
    id: this.props.post.id,
    timestamp: this.props.post.timestamp,
    voteScore: this.props.post.voteScore

  }

// AJS TODO: where do we handle if this is a new post, vs an edit - we
// need to create a unique id (uuid?) and set the commentCount to 0 etc.

  componentWillReceiveProps(nextProps) {
      if (nextProps.post) {
        this.setState({
          author: nextProps.post.author,
          title: nextProps.post.title,
          category: nextProps.post.category,
          body: nextProps.post.body,
          commentCount: nextProps.post.commentCount,
          deleted: nextProps.post.deleted,
          id: nextProps.post.id,
          timestamp: nextProps.post.timestamp,
          voteScore: nextProps.post.voteScore

        })
      }
    }

  /* from https://react.semantic-ui.com/collections/form#form-example-capture-values  */
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { author,body,category,title,commentCount,deleted,id,timestamp,voteScore} = this.state

    console.log("author: "+author)
    console.log(this.state)

    let newPost = {
      author: author,
      body: body,
      category: category,
      commentCount: commentCount,
      deleted: deleted,
      id: id,
      timestamp: timestamp,
      title: title,
      voteScore: voteScore
    }
    console.log(newPost)
    this.props.updatePost(newPost)
//    setPost
//    updatePost
  }


  render() {

    /*
            author
            body
            category
            commentCount
            deleted
            id
            timestamp
            title
            voteScore
    */
    const { categories } = this.props


    let options = null

    if (categories) {
      options =  categories.categories.map( (category) => {
      return { text: category.name, value: category.path}
      })
    }

      return (
          <Form onSubmit={this.handleSubmit}>
          <Form.Input  label='Title' placeholder='Title' name='title'  value={this.state.title} onChange={this.handleChange} />
          <Form.Select label='Category' options={options} placeholder='Category' name='category' value={this.state.category}  onChange={this.handleChange}/>
          <Form.Input  label='Author' placeholder='Author' name='author'  value={this.state.author} onChange={this.handleChange} />
          <Form.Input  label='Body' control={TextArea}  placeholder='Body' name='body' value={this.state.body} onChange={this.handleChange} />
          <Form.Button content='Submit' />
          </Form>
            )
          }
 }

 function mapStateToProps ({ post, comment },ownProps) {

   let thisPost = Object.values(post)
   if (thisPost.length)
    thisPost = thisPost.filter((apost)=>{return apost.id===ownProps.id})[0]

   return {
     post: thisPost,
     comment: comment
   }
 }

 function mapDispatchToProps (dispatch) {
   return {
     upvotePost: (data) => dispatch(upvotePost(data)),
     downvotePost: (data) => dispatch(downvotePost(data)),
     updatePost: (data) => dispatch(updatePost(data)),
     setPost: (data) => dispatch(setPost(data)),
     updateComment: (data) => dispatch(updateComment(data)),
   }
 }

export default withRouter(connect(
   mapStateToProps,
   mapDispatchToProps
 )(PostEdit))
