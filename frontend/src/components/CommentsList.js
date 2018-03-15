import React, { Component } from 'react';
import { Button, Comment, Form, Header, Icon } from 'semantic-ui-react'
import { upvoteComment, downvoteComment, deleteComment, updateComment, commentsForNewPost, updatePost, clearComments, newComment} from '../actions'
import { connect } from 'react-redux'
import  Timestamp from 'react-timestamp';
import {default as UUID} from "node-uuid";



class CommentsList extends Component {

  state = {
    editList: [],
    comments: this.props.comments,

  }


  componentWillReceiveProps(nextProps){
    //console.log("componentWillReceiveProps"+nextProps)
    if (this.props.post.id!==nextProps.post.id) {
      this.props.clearComments()
      // if there are no comments but comment count > 0 then load them
      if (nextProps.post.commentCount > 0 && !nextProps.post.comments ) {
        this.props.commentsForNewPost(nextProps.post.id)
      }
    }

    /* create a new blank comment */
    let newComment = {
      author: '',
      body: '',
      deleted: false,
      id: UUID.v4(),
      parentDeleted: false,
      parentId: nextProps.post.id,
      timeStamp: Date.now(),
      voteScore: 0,
      newComment: true
    }

    this.setState({comments:nextProps.comments.concat(newComment)})


  }

  componentDidMount(){
    this.props.clearComments()
    this.props.commentsForNewPost(this.props.post.id)
  }

  toggleCommentEdit(commentId) {
    console.log("toggleCommentEdit:"+commentId)
    if (this.state.editList.includes(commentId)) {
      const newList = this.state.editList.filter(word => word !==commentId );
      this.setState({editList:newList})
    }
    else {
      const newList = this.state.editList.concat(commentId)
      this.setState({editList:newList})
    }
  }
  handleSubmitClick = (id) => {
    console.log("handle click:"+id)
    for (const value of Object.values(this.state.comments)) {
      if (value.id===id)
      {
        // set the state for the id we have..
        if (value.newComment) {
          delete value.newComment
          this.props.newComment(value)

          // we need to add a comment to the post
          let newPost = {...this.props.post}
          newPost.commentCount++
          this.props.updatePost(newPost)

        }
        else {
          this.props.updateComment(value)

        }
      }
     }


     // close the edit
    const newList = this.state.editList.filter(word => word !==id );
    this.setState({editList:newList})

  }
handleChange = (id) => (evt,{ name, value }) => {
  let newComments = {...this.state.comments}
  let formvalue=value
  for (const value of Object.values(newComments)) {
    if (value.id===id)
    {
      value[name]=formvalue
    }
   }
  this.setState({comments:Object.values(newComments)})
}





/*

author
body
deleted
id
parentDeleted
parentId
timestamp
voteScore
*/

  render() {
    const { comments } = this.state
    if (!comments)
    {

    }
    else {

    return (
        <Comment.Group>
           <Header as='h3' dividing>Comments</Header>

           {comments.map((comment)=>{
             if (comment.deleted===true) {
               console.log('deleted')
               return ( '' )
             }
             else {

              return(

              <Comment key={comment.id}>
              {comment.newComment && (

              <Header as='h3' dividing>New Comment</Header>
            )}
            <Comment.Content>

              {!comment.newComment && (
                <div>
                <Comment.Author as='a'>{comment.author}</Comment.Author>
                <Comment.Metadata>
                  <div>Published: <Timestamp time={comment.timestamp/1000} format='ago'/></div>
                  <div>Score: {comment.voteScore}</div>
                  <Comment.Actions>
                    <Comment.Action><Icon link name='thumbs outline up' onClick={()=>this.props.upvoteComment(comment.id)}/></Comment.Action>
                    <Comment.Action><Icon link name='thumbs outline down' onClick={()=>this.props.downvoteComment(comment.id)}/></Comment.Action>
                    <Comment.Action><Icon link name='pencil' onClick={()=>this.toggleCommentEdit(comment.id)} /></Comment.Action>
                    <Comment.Action><Icon link name='trash outline' onClick={()=>this.props.deleteComment(comment.id)} /></Comment.Action>
                  </Comment.Actions>
                </Comment.Metadata>
                </div>
              )}

                {(this.state.editList.includes(comment.id) || comment.newComment) && (


                    <Form reply>
                    {comment.newComment && (
                      <Form.Input  label='Author' placeholder='Author' name='author'  value={comment.author} onChange={this.handleChange(comment.id)}   />
                    )}

                      <Form.TextArea name='body' value={comment.body} onChange={this.handleChange(comment.id)} />
                      <Button content='Save' labelPosition='left' icon='edit' primary onClick={()=>this.handleSubmitClick(comment.id)} />
                    </Form>
                    )}
                {(!this.state.editList.includes(comment.id)) && comment.hasOwnProperty('newComment')===false && (

                  <Comment.Text>{comment.body}</Comment.Text>
                )}

                  </Comment.Content>
            </Comment>
              )
            }
           })
         }

        </Comment.Group>
    )
  }
  }
}

function mapStateToProps ({ posts, comment },ownProps) {
   return {
     comments: Object.values(comment),
     posts: posts
   }
 }

 function mapDispatchToProps (dispatch) {
   return {
     upvoteComment: (data) => dispatch(upvoteComment(data)),
     downvoteComment: (data) => dispatch(downvoteComment(data)),
     deleteComment: (data) => dispatch(deleteComment(data)),
     updateComment: (data) => dispatch(updateComment(data)),
     updatePost: (data) => dispatch(updatePost(data)),
     newComment: (data) => dispatch(newComment(data)),
     commentsForNewPost: (data) => dispatch(commentsForNewPost(data)),
     clearComments: (data) => dispatch(clearComments(data))
   }
 }

export default connect(
   mapStateToProps,
   mapDispatchToProps
 )(CommentsList)
