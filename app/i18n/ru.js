export default {
    'Navigation.dashboard': 'Дашборд',

    'Dashboard.createNewRoom': 'Создать новую комнату',
    'Dashboard.enterTheCode': 'Введите код комнаты',
    'Dashboard.addRoom': 'Добавить комнату',
    'Dashboard.alreadyThere': 'Вы уже есть в комнате с этим кодом',
    'Dashboard.wrongCode': 'Неправильный код',

    'User.logout': 'Выход',
    'User.profile': 'Профиль',

    'LoginForm.login': '{isWaiting, select, true {Заходим…} other {Войти}}',
    'LoginForm.loginWithGoogle': 'Войти через Google',
    'LoginForm.password': 'Пароль',
    'LoginForm.wrongCombination': 'Неверная комбинация email-пароль',
    'LoginForm.Missing credentials': 'Не все поля заполнены',
    'LoginForm.register': 'Регистрация',

    'Register.name': 'Имя',
    'Register.lastName': 'Фамилия',
    'Register.password': 'Пароль',
    'Register.required': 'Поле необходимо заполнить',
    'Register.toRegister': '{registering, select, true {Регистрируем…} other {Зарегистрироваться}}',
    'Register.userAlreadyExists': 'Эта почта уже используется',
    'Register.wrongEmail': 'Несуществующий email',

    'Register.title': 'Регистрация участника',
    'Register.description': 'Для участия в игре нужно зарегистрироваться. Все поля обязательные.',

    'RoomCreate.chargeValue': 'Цена участия',
    'RoomCreate.correctDifferencePoints': 'Верные исход и разница',
    'RoomCreate.correctResultPoints': 'Верный исход',
    'RoomCreate.correctScorePoints': 'Точный счёт',
    'RoomCreate.create': '{loading, select, true {Создаём…} other {Создать}}',
    'RoomCreate.name': 'Название',
    'RoomCreate.roomIsFree': 'Играем на интерес',
    'RoomCreate.whatFor': 'На что играем?',
    'RoomCreate.createARoom': 'Создание комнаты',
    'RoomCreate.chargeDescription': `Мы ничего не собираем и ничего не выплачиваем вашим друзьям. 
        Это просто одно из правил, которые будут видеть все участники, с правом принять их или нет.`,
    'RoomCreate.description': `Для начала игры нужно придумать название и определиться с правилами, по которым 
        будет проходить турнир. Выберите, сколько очков в каком случае получат игроки, на что играем и т.п.`,
    'RoomCreate.pointsScheme': 'Схема начисления очков',
    'RoomCreate.required': 'Поле необходимо заполнить',

    'RoomMain.overallPlayers': '{players} {players, plural, one {игрок} few {игрока} other {игроков}}',
    'RoomMain.overallBank': `Общий банк &mdash; <b>{value} {currency, select,
        RUB {{value, plural, one {рубль} few {рубля} other {рублей}}}
        USD {{value, plural, one {доллар} few {доллара} other {долларов}}}
        EUR {евро}
        snickers {{value, plural, one {сникерс} few {сникерса} other {сникерсов}}}
        beer {{value, plural, one {пиво} few {пива} other {пив}}}
        other {}
    }</b>`,
    'RoomMain.iAmFree': 'Вы играете бесплатно и не участвуете в распределении банка. ',
    'RoomMain.playForMoney': 'Черт с ним, я в игре!'
}
