import { mapProfiles, mapMetrics } from './mappers'

const BASE_URL = 'https://rangu.23demo.com/api/audience'

export const fetchProfilesList = async (offset, queryParams) => {
  const identifiedQuery = queryParams.identified
    ? `&identified=${queryParams.identified}`
    : ''
  const searchQuery = queryParams.search ? `&search=${queryParams.search}` : ''

  const response = await fetch(
    `${BASE_URL}/list.json?orderby=timeline_engagement&order=desc&size=100&offset=${offset}${identifiedQuery}${searchQuery}`,
    {
      credentials: 'include',
    }
  )
  const data = await response.json()
  return mapProfiles(data.profiles)
}

export const fetchMetrics = async (queryParams) => {
  const identifiedQuery = queryParams.identified
    ? `&identified=${queryParams.identified}`
    : ''
  const searchQuery = queryParams.search
    ? `&search=${queryParams.search.toLowerCase()}`
    : ''

  const response = await fetch(
    `${BASE_URL}/metrics.json?size=10&include_extended_metrics_p=1${identifiedQuery}${searchQuery}`,
    {
      credentials: 'include',
    }
  )
  const data = await response.json()
  return mapMetrics(data.metrics)
}
