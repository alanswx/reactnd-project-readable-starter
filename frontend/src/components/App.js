import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import './App.css';
import * as ReadableAPI from '../utils/ReadableAPI'
import CategoryTable from './CategoryTable.js'
import PostDetail from './PostDetail.js'
import { upvotePost, downvotePost, updatePost, setPost, updateComment} from '../actions'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'






class App extends Component {

  state = {
    categories: null
  }


  componentDidMount(){
    ReadableAPI.getCategories().then((categories)=>{
      console.log(categories)
      this.setState(() => ({
        categories: categories,
      }))

    })
    ReadableAPI.getAllPosts().then((posts)=>{
      console.log(posts)
      this.props.setPost(posts)
    })
  }

  render() {
    return (
      <div className="app">
      <Route exact path="/" render={({history})=> (
        <div>
        <CategoryTable categories={this.state.categories}/>
        </div>
      )}/>
      <Route  path="/post/:id" render={({history,match})=>(
        <PostDetail id={match.params.id} categories={this.state.categories}/>
      )}/>

      </div>

    );
  }
}

function mapStateToProps ({ post, comment }) {

  return {
    post: Object.keys(post),
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
)(App))
