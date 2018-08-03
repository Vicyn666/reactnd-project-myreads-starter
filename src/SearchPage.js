import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
class SearchPage extends Component {
    state = {
        query: '',
        searchedBooks: []
    }



    makeSearchBooks = (query) => {
        BooksAPI.search(query).then((searchedBooks) => {
            this.setState({ searchedBooks: searchedBooks })
        })
    }

    updateQuery = (query) => {
        this.setState({ query: query })
        this.makeSearchBooks(query)
    }




    render() {

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                          {
                            this.state.searchedBooks.map(searchedBook => (
                              <li key={searchedBook.id}>
                              <Book
                               book={searchedBook}
                               moveShelf = {this.props.moveShelf}
                               shelf= {searchedBook.shelf}



                               />

                              </li>

                            ))
                          }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage
