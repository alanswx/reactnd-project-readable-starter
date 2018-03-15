import React, { Component } from 'react';
import {  Item } from 'semantic-ui-react'
import {  updatePost, setPosts, updateComment, deletePost} from '../actions'
import { connect } from 'react-redux'
import  Timestamp from 'react-timestamp';
import { Menu } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import CommentsList from './CommentsList.js'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";



class PostDetail extends Component {


    static contextTypes = {
      router: PropTypes.shape({
        history: PropTypes.shape({
          push: PropTypes.func.isRequired,
          replace: PropTypes.func.isRequired
        }).isRequired,
        staticContext: PropTypes.object
      }).isRequired
    };

    handleDelete = (id) => {
      this.props.deletePost(id)

      // or we can "push" a different destination
      // goback is nice because it takes you back to where you came from
      this.context.router.history.goBack()
      //this.context.router.history.push('')
    }


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
                <Menu.Item name='trash'  onClick={()=>this.handleDelete(post.id)}>
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
                    <CommentsList post={post}/>

                  </Item.Content>
                </Item>

              </Item.Group>

            }



              </div>

            )
          }

 }

 function mapStateToProps ({ posts, comment },ownProps) {
   let thisPost = Object.values(posts)
   if (thisPost.length)
    thisPost = thisPost.filter((apost)=>{return apost.id===ownProps.id})[0]

   return {
     post: thisPost,
     comment: comment
   }
 }

 function mapDispatchToProps (dispatch) {
   return {
     updatePost: (data) => dispatch(updatePost(data)),
     setPosts: (data) => dispatch(setPosts(data)),
     updateComment: (data) => dispatch(updateComment(data)),
     deletePost: (data) => dispatch(deletePost(data)),

   }
 }

export default connect(
   mapStateToProps,
   mapDispatchToProps
 )(PostDetail)
