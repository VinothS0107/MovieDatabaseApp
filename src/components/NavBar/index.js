import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const {match, onChangeInput, valueEnter, onClickSearch} = props
  const {path} = match
  const isSelected = path === '/' ? 'selected-id' : 'pages'
  const isTopRated = path === '/top-rated' ? 'selected-id' : 'pages'
  const isUpcoming = path === '/upcoming' ? 'selected-id' : 'pages'

  const onChangeInputVal = event => {
    onChangeInput(event)
  }

  const onClickSearchVal = event => {
    onClickSearch(event)
  }

  return (
    <nav className="nav-header">
      <h1 className="title">
        <Link to="/" className="logo-link">
          movieDB
        </Link>
      </h1>
      <div className="pages-list">
        <h1 className="pages-cont">
          <Link to="/" className={isSelected}>
            Popular
          </Link>
        </h1>
        <h1 className="pages-cont">
          <Link to="/top-rated" className={isTopRated}>
            Top Rated
          </Link>
        </h1>
        <li className="pages-cont">
          <Link to="/upcoming" className={isUpcoming}>
            Upcoming
          </Link>
        </li>
      </div>
      <Link to="/search" className="search-container">
        <input
          type="text"
          placeholder="Enter Movie Name"
          value={valueEnter}
          onChange={onChangeInputVal}
          className="search-bar-input"
        />
        <button
          type="button"
          className="buttonSearch"
          onClick={onClickSearchVal}
        >
          Search
        </button>
      </Link>
    </nav>
  )
}

export default withRouter(Header)
