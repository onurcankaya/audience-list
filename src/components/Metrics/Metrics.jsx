import React from 'react'
import './Metrics.css'
import Loader from '../Loader/Loader'

const Metrics = ({ data, isLoading, errorMessage }) => {
  const renderMetrics = () => {
    const dataArray = Object.keys(data).map((key) => ({
      key,
      value: data[key],
    }))

    return dataArray.map((metric, index) => (
      <div className="metric" key={index}>
        <div className="metric-title">{metric.key}</div>
        <div className="metric-value">{metric.value}</div>
      </div>
    ))
  }

  return (
    <div>
      {isLoading && !errorMessage ? (
        <div className="metrics-loader-wrapper">
          <Loader />
        </div>
      ) : (
        <div className="metrics-wrapper">
          <div className="metrics-container">{renderMetrics()}</div>
        </div>
      )}
    </div>
  )
}

export default Metrics
