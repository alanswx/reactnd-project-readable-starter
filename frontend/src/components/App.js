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
import { Header, Icon } from 'semantic-ui-react'






class App extends Component {

  state = {
    categories: null
  }


  componentDidMount(){
    ReadableAPI.getCategories().then((categories)=>{
      this.setState(() => ({
        categories: categories,
      }))

    })
    ReadableAPI.getAllPosts().then((posts)=>{
      // It is much more convenient if we reorder the posts to be in
      // an associative array with the keys as the ID instead of 0,1,2 as it comes
      // back from the server now
      let newPosts = {}
      for (const value of Object.values(posts)) {
        newPosts[value.id]=value
      }
      this.props.setPosts(newPosts)
    })
  }

  render() {
    return (
      <div className="app">
      <Header as='h2'>
        <Icon name='comments' />
        <Header.Content>
          Readable
        </Header.Content>
      </Header>      <Route exact path="/" render={({history})=> (
        <CategoryTable category="all" categories={this.state.categories}/>
      )}/>
      <Route exact path="/:category" render={({history,match})=> (
        <CategoryTable category={match.params.category} categories={this.state.categories}/>
      )}/>

      <Route exact path="/:category/edit/:id" render={({history,match})=>(
        <PostEdit id={match.params.id} categories={this.state.categories}/>

      )}/>
      <Route exact path="/:category/:id" render={({history,match})=>(
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
