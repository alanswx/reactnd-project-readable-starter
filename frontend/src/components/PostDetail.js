import React, { Component } from 'react';
import {  Item } from 'semantic-ui-react'
import { upvotePost, downvotePost, updatePost, setPost, updateComment} from '../actions'
import { connect } from 'react-redux'
import  Timestamp from 'react-timestamp';
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import * as ReadableAPI from '../utils/ReadableAPI'
import { Icon } from 'semantic-ui-react'
import CommentsList from './CommentsList.js'
import { Link } from 'react-router-dom'



class PostDetail extends Component {

  state = {
    comments: null,
  }


  componentDidMount(){

    ReadableAPI.getCommentsForPost(this.props.id).then((comments)=>{
      console.log(comments)
      this.setState(() => ({
        comments: comments,
      }))

    })
  }

  handleEditItemClick = (e, { name }) => this.setState({ edit: true })


  /* some of the sort code, and formatting taken from semantic ui example code  */

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
    const { post } = this.props

    return (
              <div>
              <Menu>
              <Menu.Item name='title' >
              { post &&
                  <b>Post: {post.title}</b>
              }
              </Menu.Item>



                <Menu.Menu position='right'>
                <Menu.Item name='edit'>
                <Link to={"/post/edit/" + post.id}>
                <Icon name='pencil' />
                </Link>
                </Menu.Item>
                <Menu.Item name='trash'  onClick={this.handleTrashItemClick}>
                <Icon link name='trash outline' />
                </Menu.Item>
                </Menu.Menu>
              </Menu>

              { post &&

              <Item.Group>
                <Item>

                  <Item.Content>
                    <Item.Header>{post.title}</Item.Header>
                    <Item.Meta>
                    <span><Icon name='user'/>{post.author}</span>
                    <span>Category: {post.category}</span>
                    <span>Score: {post.voteScore}</span>
                    <span>Published: <Timestamp time={post.timestamp/1000} format='ago'/></span>
                    </Item.Meta>
                    <Item.Description>{post.body}</Item.Description>
                    <CommentsList comments={this.state.comments}/>

                  </Item.Content>
                </Item>

              </Item.Group>

            }



              </div>

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
 )(PostDetail))
