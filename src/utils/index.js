export const generateRandomColor = () => {
  return (
    '#' +
    Math.random()
      .toString(16)
      .slice(2, 8)
  )
}

export const convertTime = (sec) => {
  const secondsNum = isNaN(parseInt(sec, 10)) ? 0 : parseInt(sec, 10)
  const hours = `${Math.floor(secondsNum / 3600)}h`
  const minutes = `${Math.floor(secondsNum / 60) % 60}m`
  const seconds = `${secondsNum % 60}s`

  return `${hours === '0h' ? '' : hours} ${
    minutes === '0m' ? '' : minutes
  } ${seconds}`
}
