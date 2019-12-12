import React from 'react'
import debounce from 'lodash.debounce'
import qs from 'qs'
import SearchBar from './SearchBar/SearchBar'
import ToggleSwitch from './ToggleSwitch/ToggleSwitch'
import Metrics from './Metrics/Metrics'
import Table from './Table/Table'
import { fetchMetrics, fetchProfilesList } from '../services/api'
import './App.css'

const PAGE_SIZE = 100

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      metrics: {},
      profilesList: [],
      searchInput: '',
      leadsOnly: false,
      offset: 0,
      loadMore: true,
      isLoading: true,
      errorMessage: '',
    }

    window.onscroll = debounce(() => {
      const {
        fetchMoreProfiles,
        state: { isLoading, loadMore },
      } = this

      if (isLoading || !loadMore) return

      // Checks if the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchMoreProfiles()
      }
    }, 500)
  }

  componentDidMount() {
    const parameters = qs.parse(window.location.search.substring(1))

    this.setState({ leadsOnly: parameters.identified || false }, () =>
      this.fetchProfileData(parameters)
    )
  }

  fetchProfileData = async (queryParams) => {
    const { offset } = this.state

    try {
      const profileData = await fetchProfilesList(offset, queryParams)
      const metricsData = await fetchMetrics(queryParams)

      this.setState({
        profilesList: profileData,
        metrics: metricsData,
        isLoading: false,
        loadMore: profileData.length >= PAGE_SIZE,
      })
    } catch (err) {
      // handle error
      this.setState({ errorMessage: 'An error occurred when loading data.' })
    }
  }

  fetchMoreProfiles = async () => {
    const parameters = qs.parse(window.location.search.substring(1))
    const { offset, loadMore } = this.state

    if (loadMore) {
      const newData = await fetchProfilesList(offset, parameters)
      this.setState((prevState) => ({
        offset: prevState.offset + PAGE_SIZE,
        profilesList: [...prevState.profilesList, ...newData],
        loadMore: newData.length >= PAGE_SIZE,
      }))
    } else {
      this.setState({ loadMore: false })
    }
  }

  onTextChange = async (e) => {
    const parameters = qs.parse(window.location.search.substring(1))
    const searchInput = e.target.value
    let url = new URL(window.location.href)

    if (searchInput.length) {
      url.searchParams.set('search', searchInput)
    } else {
      url.searchParams.delete('search')
    }
    window.history.pushState({}, null, url)
    parameters.search = searchInput
    this.setState({ searchInput }, () => {
      this.fetchProfileData(parameters)
    })
  }

  onToggle = () => {
    const { leadsOnly } = this.state
    const url = new URL(window.location.href)

    if (window.location.href.includes('identified=true')) {
      url.searchParams.delete('identified')
    } else {
      url.searchParams.append('identified', leadsOnly !== true)
    }
    window.history.pushState({}, null, url)
    const parameters = qs.parse(window.location.search.substring(1))

    this.setState(
      {
        leadsOnly: !leadsOnly,
      },
      () => this.fetchProfileData(parameters)
    )
  }

  render() {
    const {
      metrics,
      profilesList,
      searchInput,
      leadsOnly,
      isLoading,
      errorMessage,
    } = this.state

    return (
      <div className="app-container">
        <div className="app-title">Audience</div>
        <div className="top-bar">
          <SearchBar
            searchInput={searchInput}
            onTextChange={this.onTextChange}
            isLoading={isLoading}
          />
          <ToggleSwitch
            isLoading={isLoading}
            leadsOnly={leadsOnly}
            onToggle={this.onToggle}
          />
        </div>
        <Metrics
          data={metrics}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
        <Table
          data={profilesList}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    )
  }
}

export default App
