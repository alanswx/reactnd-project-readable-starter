import React, { Component } from 'react';
import { upvotePost, downvotePost, updatePost, newPost, setPosts, updateComment} from '../actions'
import { connect } from 'react-redux'
import { Form, TextArea, Breadcrumb } from 'semantic-ui-react'
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'



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
    voteScore: this.props.post.voteScore,
    newPost: this.props.post.newPost

  }


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
          voteScore: nextProps.post.voteScore,
          newPost: nextProps.post.newPost
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

    handleCancelButton = (evt) => {
      //console.log("BUTTON ON CLICK")
      // or we can "push" a different destination
      // goback is nice because it takes you back to where you came from
      this.context.router.history.goBack()
      //this.context.router.history.push('')
      evt.preventDefault()
}

  /* from https://react.semantic-ui.com/collections/form#form-example-capture-values  */
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { author,body,category,title,commentCount,deleted,id,timestamp,voteScore} = this.state
    //console.log("HANDLE SUBMIT")
    //console.log("author: "+author)
    //console.log(this.state)

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
    if (this.state.newPost===true) {
      this.props.newPost(newPost)
    }
    else {
      this.props.updatePost(newPost)

    }
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
          <Breadcrumb size='mini'>
            <Breadcrumb.Section ><Link to={"/"}>Home</Link></Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section ><Link to={"/"+(this.state.category?this.state.category:"unknown")+"/"+this.state.id}>Post</Link></Breadcrumb.Section>
            <Breadcrumb.Divider icon='right chevron' />
            <Breadcrumb.Section active>Edit</Breadcrumb.Section>
          </Breadcrumb>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input  label='Title' placeholder='Title' name='title'  value={this.state.title} onChange={this.handleChange} />
            <Form.Select label='Category' options={options} placeholder='Category' name='category' value={this.state.category}  onChange={this.handleChange}/>
            <Form.Input  label='Author' placeholder='Author' name='author'  value={this.state.author} onChange={this.handleChange} />
            <Form.Input  label='Body' control={TextArea}  placeholder='Body' name='body' value={this.state.body} onChange={this.handleChange} />
            <Form.Group inline>
              <Form.Button content='Submit' />
              <Form.Button onClick={this.handleCancelButton}>Cancel</Form.Button>
            </Form.Group>
          </Form>
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
     timestamp: Date.now(),
     title: '',
     voteScore: 0,
     newPost: true
   }
   else {
     thisPost.newPost=false
   }

   //console.log("mapStateToProps")
   //console.log(thisPost)
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
     newPost: (data) => dispatch(newPost(data)),
     setPosts: (data) => dispatch(setPosts(data)),
     updateComment: (data) => dispatch(updateComment(data)),
   }
 }

export default connect(
   mapStateToProps,
   mapDispatchToProps
 )(PostEdit)
