export default (value) => {
  if (value === null || value === '' || !value) {
    return ' - '
  }
  const phone = value.toString().trim().replace(/[^\w\s]/g, '').replace(/\s/g, '')
  if (value.length < 10) {
    return value
  }
  const ddd = '(' + phone.substr(0, 2) + ') '
  let begin = phone.substr(2, 4)
  let end = phone.substr(6, 4)
  if (phone.length > 10) {
    begin = phone.substr(2, 5)
    end = phone.substr(7, 4)
  }
  return ddd + begin + '-' + end
}
