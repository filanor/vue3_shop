const formatter = new Intl.NumberFormat('ru-RU', 
  {
    style: 'currency',
    currency: 'RUB'
  }
)

export function currency(val) {
  return formatter.format(val)
}