import React from 'react'
import './Table.css'
import { generateRandomColor } from '../../utils'
import Loader from '../Loader/Loader'

const Table = ({ data, isLoading }) => {
  const headers = ['', 'Last Seen', 'Number of Visits', 'Engagement']

  const renderTableHeader = () => {
    return headers.map((header, index) => {
      return (
        <th className="header" key={index}>
          {header}
        </th>
      )
    })
  }

  const handleImageError = (e) => {
    e.target.style.display = 'none'
  }

  const renderTableData = () => {
    return data.map((person, index) => {
      const {
        avatar,
        flag,
        name,
        email,
        lastSeen,
        numberOfVisits,
        engagement,
      } = person

      return (
        <tr key={index}>
          <td className="identity">
            <div className="avatar-wrapper">
              {avatar ? (
                <img
                  className="avatar"
                  src={avatar}
                  alt="person-avatar"
                  onError={handleImageError}
                />
              ) : (
                <div
                  className="avatar"
                  style={{ backgroundColor: generateRandomColor() }}></div>
              )}
            </div>
            <div className="person-details">
              <div className="name">{name}</div>
              <div className="person-subline">
                {flag && (
                  <img
                    className="flag-component"
                    src={`https://rangu.23demo.com/resources/um/graphics/flags/${flag}.gif`}
                    alt="flag"
                  />
                )}
                <div className="email">{email}</div>
              </div>
            </div>
          </td>
          <td>{lastSeen}</td>
          <td>{numberOfVisits}</td>
          <td>{engagement}</td>
        </tr>
      )
    })
  }

  return (
    <div>
      {isLoading ? (
        <div className="table-loader-wrapper">
          <Loader />
        </div>
      ) : (
        <table id="people" cellSpacing="0">
          <tbody>
            <tr>{renderTableHeader()}</tr>
            {renderTableData()}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Table
