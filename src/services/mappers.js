import moment from 'moment'
import { convertTime } from '../utils'

export const mapProfiles = (profiles) => {
  return profiles.map((user) => {
    return {
      avatar: user && user.profile && user.profile.avatar,
      flag:
        user && user.profile && user.profile.countryCode
          ? user.profile.countryCode.toLowerCase()
          : '',
      email:
        user && user.email
          ? user.email
          : `${user.profile.city ? user.profile.city + ',' : ''} ${
              user.profile.country ? user.profile.country : ''
            }`,
      name:
        user.profile &&
        `${user.profile.firstname ? user.profile.firstname : 'Viewer'} ${
          user.profile.lastname
            ? user.profile.lastname
            : user.profile.company
            ? ' from ' + user.profile.company
            : ' #' + user.identifier
        }`,
      company: user && user.profile && user.profile.company,
      lastSeen:
        user && user.recent && moment().diff(moment(user.recent), 'days') > 3
          ? moment(user.recent).format('ddd MMM D YYYY')
          : moment(user.recent).fromNow(),
      numberOfVisits: user && user.timeline_sessions,
      engagement: user && convertTime(user.timeline_engagement),
    }
  })
}

export const mapMetrics = (metrics) => {
  return {
    People: metrics && metrics.total_profiles,
    'Identified Leads':
      metrics && metrics.total_identified_profiles
        ? metrics.total_identified_profiles
        : 0,
    'Avg Engagement': convertTime(metrics && metrics.avg_timeline_engagement),
  }
}
