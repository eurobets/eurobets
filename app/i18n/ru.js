export default {
    'Navigation.dashboard': 'Дашборд',

    'BetDialog.error.gameAlreadyStarted': 'Игра уже началась',
    'BetDialog.error.noGame': 'Нет такого матча',
    'BetDialog.error.required': 'Счёт не проставлен',

    'BetDialog.teamToPromote': 'Выберите победителя пары',
    'BetDialog.cancel': 'Отмена',
    'BetDialog.save': '{creating, select, true {Сохраняем…} other {Сохранить}}',
    'BetDialog.matchday': `{matchday, select, 
        1 {1 круг}
        2 {2 круг}
        3 {3 круг}
        4 {4 круг}
        5 {5 круг}
        6 {6 круг}
        7 {1/8 финала}
        8 {Четвертьфинал}
        9 {Полуфинал}
        10 {Финал}
    }`,

    'BetsTable.points': 'Очки',

    'GameWrapper.info': `<h2>Как устроена игра</h2>
        <p>
            На каждый из будущих матчей можно сделать ставку. Пока ставку можно менять, она не видна другим игрокам.
            За 5 минут до начала матча все ставки на игру открываются и их больше нельзя менять.
        </p>
        <p>
            По результатам матча игрокам начисляются очки, их можно получить за:</p>
            
            <ul>
                 <li>Верно угаданный счёт</li>    
                 <li>или верно угаданные исход игры и разницу</li>
                 <li>или верно угаданный исход игры</li>
            </ul>
        <p>
           Бонусные баллы можно получить в плей-офф, верно угадав команду, которая пройдёт дальше.
        </p>
        <p>    
            Для каждой комнаты баллы за номинации могут быть установлены свои. Их можно посмотреть
            на странице комнаты под таблицей.
        </p>
        <p>
            Все ставки делаются только на основное время матча. Если игрок в плей-офф поставил на победу
            первой команды 3:1, а матч закончился в основное время 1:1 и первая команда выиграла 2:0 в 
            дополнительное время, то игрок получает только бонусные баллы за проход первой команды дальше.
        </p>
        <p>
            В каждой игре можно играть не на деньги, и не участвовать в распределении поучившегося призового фонда. 
            Как распорядиться с призовым фондом участники комнаты решают сами. 
            Мы ни с кого деньги не собираем, мы просто считаем числа :).
        </p>`,
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

    'Bots.trololo': 'Трололо',
    'Bots.trololoDescription': `Трололо получает число очков, равное возможному максимуму за эту игру 
        минус максимальное число очков среди игроков, играющих на деньги. Трололо на коне, когда случилось то, что 
        никто не предсказывал.`,

    'Room.tournamentStarted': 'Турнир начался, состояние больше нельзя менять',
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
        RUB {{fee, plural, one {рубль} few {рубля} other {рублей}}}
        USD {{fee, plural, one {доллар} few {доллара} other {долларов}}}
        EUR {евро}
        snickers {{fee, plural, one {сникерс} few {сникерса} other {сникерсов}}}
        beer {{fee, plural, one {пиво} few {пива} other {пив}}}
        other {}
    }</b>`,

    'Room.rules': `Счёт — <b>{score}</b>, разница — <b>{difference}</b>, исход — <b>{result}</b>
        {promotion, select, 0 { } other {</br>победа в плей-офф: <b>+{promotion}</b>}}
        {finalsCoefficient, select, 1 {} other {</br>очки в полуфинале и финале: <b>×{finalsCoefficient}</b>}}`,


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
    'Teams.name.Iceland': 'Исландия',
    'Teams.name.Saudi Arabia': 'Саудовская Аравия',
    'Teams.name.Egypt': 'Египет',
    'Teams.name.Uruguay': 'Уругвай',
    'Teams.name.Morocco': 'Марокко',
    'Teams.name.Iran': 'Иран',
    'Teams.name.Australia': 'Австралия',
    'Teams.name.Argentina': 'Аргентина',
    'Teams.name.Peru': 'Перу',
    'Teams.name.Denmark': 'Дания',
    'Teams.name.Nigeria': 'Нигерия',
    'Teams.name.Costa Rica': 'Коста-Рика',
    'Teams.name.Serbia': 'Сербия',
    'Teams.name.Mexico': 'Мексика',
    'Teams.name.Brazil': 'Бразилия',
    'Teams.name.Korea Republic': 'Корея',
    'Teams.name.Panama': 'Панама',
    'Teams.name.Tunisia': 'Тунис',
    'Teams.name.Colombia': 'Колумбия',
    'Teams.name.Japan': 'Япония',
    'Teams.name.Senegal': 'Сенегал',
    'Teams.name.': '?',
}
