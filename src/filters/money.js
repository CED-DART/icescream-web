export default (value) => {
  if (value === null || value === '' || !value) {
    return 'R$ 0,00'
  }
  const formatedMoney = parseFloat(value).toFixed(2).replace(',', '').replace('.', ',')
  return `R$ ${formatedMoney}`
}
