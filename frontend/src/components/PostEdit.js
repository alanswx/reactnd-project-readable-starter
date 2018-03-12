import React, { Component } from 'react';
import { upvotePost, downvotePost, updatePost, setPosts, updateComment} from '../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Form, TextArea, Button } from 'semantic-ui-react'
import PropTypes from "prop-types";



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


/*
 From:
 https://stackoverflow.com/questions/29244731/react-router-how-to-manually-invoke-link
*/

    static contextTypes = {
      router: PropTypes.shape({
        history: PropTypes.shape({
          push: PropTypes.func.isRequired,
          replace: PropTypes.func.isRequired
        }).isRequired,
        staticContext: PropTypes.object
      }).isRequired
    };

    handleOnClick = () => {
      // or we can "push" a different destination
      // goback is nice because it takes you back to where you came from
      this.context.router.history.goBack()
      //this.context.router.history.push('')
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
    this.context.router.history.goBack()

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
        <div>
          <Form onSubmit={this.handleSubmit}>
          <Form.Input  label='Title' placeholder='Title' name='title'  value={this.state.title} onChange={this.handleChange} />
          <Form.Select label='Category' options={options} placeholder='Category' name='category' value={this.state.category}  onChange={this.handleChange}/>
          <Form.Input  label='Author' placeholder='Author' name='author'  value={this.state.author} onChange={this.handleChange} />
          <Form.Input  label='Body' control={TextArea}  placeholder='Body' name='body' value={this.state.body} onChange={this.handleChange} />
          <Form.Button content='Submit' />
          </Form>
            <Button onClick={this.handleOnClick}>Cancel</Button>
          </div>
            )
          }
 }

 function mapStateToProps ({ posts, comment },ownProps) {

   let thisPost = Object.values(posts)
   if (thisPost.length)
    thisPost = thisPost.filter((apost)=>{return apost.id===ownProps.id})[0]

   if (!thisPost)
    thisPost  = {
     author: '',
     body: '',
     category: '',
     commentCount: 0,
     deleted: false,
     id: ownProps.id,
     timestamp: Date.now(), // TODO AJS - add time from javascript
     title: '',
     voteScore: 0
   }

   console.log("mapStateToProps")
   console.log(thisPost)
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
     setPosts: (data) => dispatch(setPosts(data)),
     updateComment: (data) => dispatch(updateComment(data)),
   }
 }

export default withRouter(connect(
   mapStateToProps,
   mapDispatchToProps
 )(PostEdit))
