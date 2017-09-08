import moment from 'moment'

export default (value) => {
  if (Date.parse(value)) {
    const date = new Date(value)
    return moment(date).format('DD/MM/YYYY')
  }
  return ' - '
}
