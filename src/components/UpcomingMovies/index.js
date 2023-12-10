import {Component} from 'react'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../NavBar'

const apiKey = '8ec417dd387e3d58d78bc240f7fec3b1'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

export default class UpcomingMovie extends Component {
  state = {
    upcomingMovies: [],
    status: apiStatusConstants.initial,
    page: 1,
  }

  componentDidMount() {
    this.upcomingMovieData(apiKey)
  }

  upcomingMovieData = async key => {
    this.setState({status: apiStatusConstants.inProgress})
    const {page} = this.state
    const upcomingMoviesURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=${page}`
    const response = await fetch(upcomingMoviesURL)
    if (response.ok === true) {
      const data = await response.json()
      const {results} = data

      this.setState({
        upcomingMovies: results,
        status: apiStatusConstants.success,
      })
    }
  }

  renderLoader = () => (
    <>
      <div className="loader-spinner">
        <Loader type="Circles" height="80" width="80" />
      </div>
    </>
  )

  renderSuccess = () => {
    const {upcomingMovies, page} = this.state

    return (
      <>
        <ul className="popular-movies">
          {upcomingMovies.map(each => (
            <li key={each.id} className="list-movies">
              <img
                src={`https://image.tmdb.org/t/p/w500${each.poster_path}`}
                className="poster_image"
                alt={each.poster_path}
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
        <div className="pagination">
          <button
            type="button"
            className={page === 1 ? 'disableButton' : 'buttonPagination'}
            onClick={() => this.pagination('Decrease')}
          >
            Prev
          </button>
          <p className="pageNumber">{page}</p>
          <button
            type="button"
            className="buttonPagination"
            onClick={() => this.pagination('Increase')}
          >
            Next
          </button>
        </div>
      </>
    )
  }

  pagination = operator => {
    const {page} = this.state
    if (operator === 'Decrease' && page > 1) {
      this.setState(
        prev => ({
          page: prev.page - 1,
        }),
        this.componentDidMount,
      )
    }
    if (operator === 'Increase') {
      this.setState(
        prev => ({
          page: prev.page + 1,
        }),
        this.componentDidMount,
      )
    }
  }

  render() {
    const {status} = this.state

    return (
      <>
        <Header />
        {status === apiStatusConstants.inProgress
          ? this.renderLoader()
          : this.renderSuccess()}
      </>
    )
  }
}
