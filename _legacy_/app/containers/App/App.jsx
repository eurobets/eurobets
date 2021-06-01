import React, { Component, PropTypes } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import ru from 'react-intl/locale-data/ru';
import { connect } from 'react-redux';

import Header from 'components/Header/Header';
import Notification from 'components/Notification/Notification';
import messages from '../../i18n/ru';

import './App.scss';

addLocaleData(ru);

class App extends Component {

    render() {
        return (
            <IntlProvider messages={messages} locale={'ru-RU'}>
                {this.props.children}
            </IntlProvider>
        );
    }
};


export default App;
