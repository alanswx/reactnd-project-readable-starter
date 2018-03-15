import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import './App.css';
import * as ReadableAPI from '../utils/ReadableAPI'
import CategoryTable from './CategoryTable.js'
import PostDetail from './PostDetail.js'
import PostEdit from './PostEdit.js'
import { loadPosts } from '../actions'
import { withRouter } from 'react-router'
import { Header, Icon } from 'semantic-ui-react'






class App extends Component {

  state = {
    categories: null
  }


  componentDidMount(){
    /* fetch and store all the categories */
    ReadableAPI.getCategories().then((categories)=>{
      this.setState(() => ({
        categories: categories,
      }))

    })

    this.props.loadPosts()

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
    loadPosts: (data) => dispatch(loadPosts(data)),
  }
}
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
