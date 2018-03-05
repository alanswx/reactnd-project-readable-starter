import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import { upvotePost, downvotePost, updatePost, setPost, updateComment} from '../actions'
import { connect } from 'react-redux'
import  Timestamp from 'react-timestamp';
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router'




class PostDetail extends Component {

  state = {
    column: null,
    direction: null,
    category: null
  }

  handleCategoryItemClick = (e, { name }) => this.setState({ category: name })

  handleNewItemClick = (e, { name }) => console.log({name})


  handleSort = clickedColumn => () => {
    const { column, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        direction: 'ascending',
      })

      return
    }

    this.setState({
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }
/* FROM: https://codepen.io/austinlyons/pen/YpmyJB */
  compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
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
    const { column, direction } = this.state
    const { post, categories, id } = this.props

    const { category } = this.state

    let thisPost = post.filter( (table)=>{return table.id===id})[0]
    console.log("thispost")
    console.log(post)
    console.log(id)
    console.log(thisPost)
    /* a lot of react examples sort the array that is kept in the local state.
      because we are handling the posts in the redux store, I didn't think it made sense to
      modify them. This way we just sort a copy before rendering. We change the local state variables
      direction and column - this causes us to be called to re-render */
    let arrayCopy = [...post];
    if (this.state.column)
      arrayCopy.sort(this.compareBy(this.state.column));
    if (direction==='descending')
      arrayCopy.reverse()
    return (
      <div>
      <Menu>
      <Menu.Item>
        <b>Category:</b>
      </Menu.Item>
      <Menu.Item name='all' active={category === null} onClick={this.handleCategoryItemClick}>
        All
      </Menu.Item>

      {
        console.log(categories)
      }
      {
        categories && categories.categories.map( (cat)=> {
          return (
            <Menu.Item name={cat.path} active={category === cat.path} onClick={this.handleCategoryItemClick}>
              {cat.name}
            </Menu.Item>
          )
        })
      }

        <Menu.Menu position='right'>
          <Menu.Item name='new' active={category === 'new'} onClick={this.handleNewItemClick}>
           AJS New Post
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={column === 'title' ? direction : null} onClick={this.handleSort('title')}>
              Title
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'author' ? direction : null} onClick={this.handleSort('author')}>
              Author
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'category' ? direction : null} onClick={this.handleSort('category')}>
              Category
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'voteScore' ? direction : null} onClick={this.handleSort('voteScore')}>
              Score
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'timestamp' ? direction : null} onClick={this.handleSort('timestamp')}>
              Time
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { thisPost &&
              <Table.Row key={thisPost.id}>
              <Table.Cell>{thisPost.title}</Table.Cell>
              <Table.Cell>{thisPost.author}</Table.Cell>
              <Table.Cell>{thisPost.category}</Table.Cell>
              <Table.Cell>{thisPost.voteScore}</Table.Cell>
              <Table.Cell><Timestamp time={thisPost.timestamp/1000} format='ago'/></Table.Cell>
            </Table.Row>
            }
        </Table.Body>
      </Table>
      </div>

    )
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
 )(PostDetail))
