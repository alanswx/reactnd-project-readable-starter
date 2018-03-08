import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import './App.css';
import * as ReadableAPI from '../utils/ReadableAPI'
import CategoryTable from './CategoryTable.js'
import PostDetail from './PostDetail.js'
import PostEdit from './PostEdit.js'
import { upvotePost, downvotePost, updatePost, setPosts, updateComment} from '../actions'
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
      this.props.setPosts(posts)
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
      <Route exact path="/post/edit/:id" render={({history,match})=>(
        <PostEdit id={match.params.id} categories={this.state.categories}/>

      )}/>
      <Route exact path="/post/:id" render={({history,match})=>(
        <PostDetail id={match.params.id} categories={this.state.categories}/>
      )}/>

      </div>

    );
  }
}

function mapStateToProps ({ posts, comment }) {

  return {
    posts: Object.keys(posts),
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
)(App))
