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
  }

  componentDidMount() {
    this.upcomingMovieData(apiKey)
  }

  upcomingMovieData = async key => {
    this.setState({status: apiStatusConstants.inProgress})
    const upcomingMoviesURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`
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
    const {upcomingMovies} = this.state

    return (
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
    )
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
