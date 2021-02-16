const ERROR_CODES  = {
  EMAIL_NOT_FOUND: 'Пользователь с таким Emailне существует',
  INVALID_PASSWORD: 'Неверный пароль',
  auth: 'Для доступа необходимо войти в систему'
}
export function error(code){
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}