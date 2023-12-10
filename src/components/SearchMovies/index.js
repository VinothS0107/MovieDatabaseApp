import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import './index.css'

const apiKey = '8ec417dd387e3d58d78bc240f7fec3b1'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchMovies extends Component {
  state = {
    status: apiStatusConstants.initial,
    search: '',
    searchedMovieDetails: [],
  }

  componentDidMount() {
    this.popularMovie(apiKey)
  }

  popularMovie = async apikey => {
    this.setState({status: apiStatusConstants.inProgress})
    const {search} = this.state
    const getSearchedMoviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${search}&page=1`
    const response = await fetch(getSearchedMoviesURL)
    if (response.ok === true) {
      const data = await response.json()
      const {results} = data

      this.setState({
        searchedMovieDetails: results,
        status: apiStatusConstants.success,
        search: '',
      })
    }
  }

  onChangeEnter = event => {
    const search = event.target.value
    this.setState({search})
  }

  onSearchItem = event => {
    event.preventDefault()
    this.componentDidMount()
  }

  renderLoader = () => (
    <>
      <div className="loader-spinner">
        <Loader type="Circles" height="80" width="80" />
      </div>
    </>
  )

  renderSuccess = () => {
    const {searchedMovieDetails} = this.state

    return (
      <ul className="popular-movies">
        {searchedMovieDetails.map(each => (
          <li className="list-movies">
            <img
              src={`https://image.tmdb.org/t/p/w500${each.poster_path}`}
              className="poster_image"
              alt={each.title}
            />
            <p className="rating">{Math.ceil(each.vote_average * 10) / 10}</p>
            <div className="content">
              <h1 className="movie-title">{each.title}</h1>
              <p className="movie-date">{each.release_date}</p>
              <Link
                to={`/movie/${each.id}`}
                key={each.id}
                className="each-movie-link "
              >
                <button type="button" className="viewDetails">
                  View Details
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderInitial = () => {
    const {searchedMovieDetails} = this.state
    const checkLength = searchedMovieDetails.length
    return (
      <>
        {checkLength === 0 ? (
          <h1 className="searchMovie">Search Movies</h1>
        ) : (
          this.renderSuccess()
        )}
      </>
    )
  }

  render() {
    const {search, status} = this.state
    return (
      <>
        <nav className="nav-header">
          <h1 className="title">
            <Link to="/" className="logo-link">
              movieDB
            </Link>
          </h1>
          <div className="pages-list">
            <h1 className="pages-cont">
              <Link to="/" className="pages">
                Popular
              </Link>
            </h1>
            <h1 className="pages-cont">
              <Link to="/top-rated" className="pages">
                Top Rated
              </Link>
            </h1>
            <li className="pages-cont">
              <Link to="/upcoming" className="pages">
                Upcoming
              </Link>
            </li>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Enter Movie Name"
              className="search-bar-input"
              value={search}
              onChange={this.onChangeEnter}
            />
            <button
              type="button"
              className="buttonSearch"
              onClick={this.onSearchItem}
            >
              Search
            </button>
          </div>
        </nav>
        {status === apiStatusConstants.inProgress
          ? this.renderLoader()
          : this.renderInitial()}
      </>
    )
  }
}
export default withRouter(SearchMovies)
