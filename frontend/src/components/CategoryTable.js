import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import { upvotePost, downvotePost, deletePost, updatePost, setPosts, updateComment} from '../actions'
import { connect } from 'react-redux'
import  Timestamp from 'react-timestamp';
import { Menu, Icon, Breadcrumb } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import PropTypes from "prop-types";

//TODO - try to create a UUID and use it for the new link
import {default as UUID} from "node-uuid";



class CategoryTable extends Component {

  state = {
    column: null,
    direction: null,
    category: null
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

      handleCategoryItemClick = (e, { name }) => {
        //this.setState({ category: name })
        let newPath = "/"
        if (name!=="all")
           newPath = "/"+name
        this.context.router.history.push(newPath)
      }

      handleNewItemClick = (e, { name }) => {
        // create a UUID
        let newPath = "/post/edit/"+UUID.v4()
        this.context.router.history.push(newPath)
  }

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
    const { posts, categories } = this.props

    const { category } = this.props


    /* a lot of react examples sort the array that is kept in the local state.
      because we are handling the posts in the redux store, I didn't think it made sense to
      modify them. This way we just sort a copy before rendering. We change the local state variables
      direction and column - this causes us to be called to re-render */
    let arrayCopy = [...posts];
    if (this.state.column)
      arrayCopy.sort(this.compareBy(this.state.column));
    if (direction==='descending')
      arrayCopy.reverse()
    return (
      <div>
      <Breadcrumb size='mini'>
        <Breadcrumb.Section active>Home</Breadcrumb.Section>
      </Breadcrumb>
      <Menu>
      <Menu.Item>
        <b>Category:</b>
      </Menu.Item>
      <Menu.Item key='all' name='all' active={category === null || category ==="all"} onClick={this.handleCategoryItemClick}>
        All
      </Menu.Item>
      {
        categories && categories.categories.map( (cat)=> {
          return (
            <Menu.Item key={cat.path} name={cat.path} active={category === cat.path} onClick={this.handleCategoryItemClick}>
              {cat.name}
            </Menu.Item>
          )
        })
      }

        <Menu.Menu position='right'>
          <Menu.Item name='new' active={category === 'new'} onClick={this.handleNewItemClick}>
           New Post
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
            <Table.HeaderCell sorted={column === 'commentCount' ? direction : null} onClick={this.handleSort('commentCount')}>
              Comments
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'timestamp' ? direction : null} onClick={this.handleSort('timestamp')}>
              Time
            </Table.HeaderCell>
            <Table.HeaderCell>
              Actions
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>

          {arrayCopy && arrayCopy.length && arrayCopy.filter( (table)=>{return (category===null || category==='all' || table.category===category)}).map( (table) => {
            if (table.deleted===true) {
              return ( '' )
            }
            else {
              return (<Table.Row key={table.id}>
              <Table.Cell><Link to={"/"+table.category+"/" + table.id}>{table.title}</Link></Table.Cell>
              <Table.Cell>{table.author}</Table.Cell>
              <Table.Cell>{table.category}</Table.Cell>
              <Table.Cell>{table.voteScore}</Table.Cell>
              <Table.Cell>{table.commentCount}</Table.Cell>
              <Table.Cell><Timestamp time={table.timestamp/1000} format='ago'/></Table.Cell>
              <Table.Cell>
              <List horizontal link>
               <List.Item as='a' icon='thumbs outline up' onClick={()=>this.props.upvotePost(table.id)}/>
                <List.Item as='a' icon='thumbs outline down' onClick={()=>this.props.downvotePost(table.id)}/>
                <List.Item><Link to={"/post/edit/" + table.id}><Icon name='pencil' /></Link></List.Item>
                <List.Item as='a' icon='trash' onClick={()=>this.props.deletePost(table.id)}/>
              </List>
              </Table.Cell>
            </Table.Row>)
          }
          })
        }
          </Table.Body>

      </Table>
      </div>

    )
  }
 }

 function mapStateToProps ({ posts, comment }) {
   return {
     posts: Object.values(posts),
     comment: comment
   }
 }

 function mapDispatchToProps (dispatch) {
   return {
     upvotePost: (data) => dispatch(upvotePost(data)),
     downvotePost: (data) => dispatch(downvotePost(data)),
     deletePost: (data) => dispatch(deletePost(data)),
     updatePost: (data) => dispatch(updatePost(data)),
     setPosts: (data) => dispatch(setPosts(data)),
     updateComment: (data) => dispatch(updateComment(data)),
   }
 }

export default connect(
   mapStateToProps,
   mapDispatchToProps
 )(CategoryTable)
