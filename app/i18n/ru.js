export default {
    'Navigation.dashboard': 'Дашборд',

    'BetDialog.error.gameAlreadyStarted': 'Игра уже началась',
    'BetDialog.error.noGame': 'Нет такого матча',
    'BetDialog.error.required': 'Счёт не проставлен',

    'BetDialog.cancel': 'Отмена',
    'BetDialog.save': '{creating, select, true {Сохраняем…} other {Сохранить}}',
    'BetDialog.matchday': `{matchday, select, 
        1 {1 круг}
        2 {2 круг}
        3 {3 круг}
        4 {1/8 финала}
        5 {Четвертьфинал}
        6 {Полуфинал}
        7 {Финал}
    }`,

    'BetsTable.points': 'Очки',

    'GameWrapper.enterTheCode': 'Введите код комнаты',
    'GameWrapper.addRoom': 'Добавить комнату',
    'GameWrapper.alreadyThere': 'Вы уже есть в комнате с этим кодом',
    'GameWrapper.wrongCode': 'Неправильный код',

    'GameWrapper.addFirstRoom': 'Добавьте первую комнату',
    'GameWrapper.addFirstRoomReason': `Чтобы начать играть, нужно добавить первую комнату. </br>
        Можно ввести код доступа к комнате, в которую вас пригласил друг. А можно создать свою комнату.`,
    'GameWrapper.createRoom': 'Создать новую',

    'Games.time': '{date, date, medium}, {date, time, long}',
    'Games.newBet': 'сделать ставку',
    'Games.score': 'Счёт',
    'Games.bet': 'Ставка',
    'Games.points': 'Очки',
    'Games.toggleOld': `{hideOld, select, 
        true {Показать} 
        false {Скрыть}
    } предыдущие игры`,

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

    'Room.leaveRoom': 'Покинуть комнату',
    'Room.playForMoney': '{changingMe, select, true {Меняем…} other {Играть на деньги}}',
    'Room.playForFree': '{changingMe, select, true {Меняем…} other {Я хочу играть не на деньги}}',
    'Room.itself': 'Комната',
    'Room.bets': 'Ставки и результаты',
    'Room.overallBank': `Призовой фонд &mdash; <b>{value} {currency, select,
        RUB {{value, plural, one {рубль} few {рубля} other {рублей}}}
        USD {{value, plural, one {доллар} few {доллара} other {долларов}}}
        EUR {евро}
        snickers {{value, plural, one {сникерс} few {сникерса} other {сникерсов}}}
        beer {{value, plural, one {пиво} few {пива} other {пив}}}
        other {}
    }</b>, взнос <b>{fee} {currency, select,
        RUB {{value, plural, one {рубль} few {рубля} other {рублей}}}
        USD {{value, plural, one {доллар} few {доллара} other {долларов}}}
        EUR {евро}
        snickers {{value, plural, one {сникерс} few {сникерса} other {сникерсов}}}
        beer {{value, plural, one {пиво} few {пива} other {пив}}}
        other {}
    }</b>`,

    'Room.rules': `Счёт — <b>{score}</b>, разница — <b>{difference}</b>, исход — <b>{result}</b>, 
        победа в плей-офф — <b>+{promotion}</b>`,


    'RoomCreate.chargeValue': 'Цена участия',
    'RoomCreate.correctDifferencePoints': 'Верные исход и разница',
    'RoomCreate.correctResultPoints': 'Верный исход',
    'RoomCreate.correctScorePoints': 'Точный счёт',
    'RoomCreate.promotionPoints': 'Победа в плей-офф',
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
    'RoomMain.iAmFree': 'Вы играете бесплатно и не участвуете в распределении банка. ',

    'Teams.name.France': 'Франция',
    'Teams.name.Romania': 'Румыния',
    'Teams.name.Albania': 'Албания',
    'Teams.name.Switzerland': 'Швейцария',
    'Teams.name.Wales': 'Уэльс',
    'Teams.name.Slovakia': 'Словакия',
    'Teams.name.England': 'Англия',
    'Teams.name.Russia': 'Россия',
    'Teams.name.Turkey': 'Турция',
    'Teams.name.Croatia': 'Хорватия',
    'Teams.name.Poland': 'Польша',
    'Teams.name.Northern Ireland': 'Северная Ирландия',
    'Teams.name.Germany': 'Германия',
    'Teams.name.Ukraine': 'Украина',
    'Teams.name.Spain': 'Испания',
    'Teams.name.Czech Republic': 'Чехия',
    'Teams.name.Republic of Ireland': 'Ирландия',
    'Teams.name.Sweden': 'Швеция',
    'Teams.name.Belgium': 'Бельгия',
    'Teams.name.Italy': 'Италия',
    'Teams.name.Austria': 'Австрия',
    'Teams.name.Hungary': 'Венгрия',
    'Teams.name.Portugal': 'Португалия',
    'Teams.name.Iceland': 'Исландия'
}
