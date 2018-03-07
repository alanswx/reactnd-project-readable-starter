import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { upvotePost, downvotePost, updatePost, setPost, updateComment} from '../actions'
import { connect } from 'react-redux'
import  Timestamp from 'react-timestamp';
import { withRouter } from 'react-router'
import { Icon } from 'semantic-ui-react'



class CommentsList extends Component {

  handleNewItemClick = (e, { name }) => console.log({name})
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
    const { comments } = this.props
    if (!comments)
    {
      return (
        <Form reply>
          <Form.TextArea />
          <Button content='Add Reply' labelPosition='left' icon='edit' primary />
        </Form>

      )
    }
    else {

    return (
        <Comment.Group>
           <Header as='h3' dividing>Comments</Header>

           {comments.map((comment)=>{
             if (comments.deleted===true) {
               return ( '' )
             }
             else {

              return(
              <Comment key={comment.id}>
              <Comment.Content>

                <Comment.Author as='a'>{comment.author}</Comment.Author>
                <Comment.Metadata>
                <div>Published: <Timestamp time={comment.timestamp/1000} format='ago'/></div>
                <div>Score: {comment.voteScore}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
                <Comment.Actions>
                <Comment.Action><Icon link name='thumbs outline up' /></Comment.Action>
                <Comment.Action><Icon link name='thumbs outline down' /></Comment.Action>
                <Comment.Action><Icon link name='pencil' /></Comment.Action>
                <Comment.Action><Icon link name='trash outline' /></Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
              )
            }
           })
         }
           <Form reply>
             <Form.TextArea />
             <Button content='Add Reply' labelPosition='left' icon='edit' primary />
           </Form>

        </Comment.Group>
    )
  }
  }
}

 function mapStateToProps ({ post, comment }) {
   return {
     post: Object.values(post),
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
 )(CommentsList))
