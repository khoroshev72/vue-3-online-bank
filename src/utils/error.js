const ERRORS_MAP = {
    EMAIL_NOT_FOUND: 'Пользователя с таким Email не существует',
    INVALID_PASSWORD: 'Неверный пароль',
    auth: 'Войдите в аккаунт'
}

export function error(code){
    return  ERRORS_MAP[code] ?? 'Неизвестная ошибка'
}