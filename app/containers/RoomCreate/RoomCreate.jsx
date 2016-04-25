import b from 'b_';
import React, { Component, PropTypes } from 'react';
import { injectIntl, FormattedHTMLMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash'
import MenuItem from 'material-ui/lib/menus/menu-item';

import { createRoom } from 'actions/rooms';
import Button from '../../components/Button/Button.jsx';
import Input from '../../components/Input/Input.jsx';
import Checkbox from '../../components/Checkbox/Checkbox.jsx';
import Select from '../../components/Select/Select.jsx';
import './RoomCreate.scss';

const RoomCreate = React.createClass({
    propTypes: {
        intl: PropTypes.object,
        user: PropTypes.object,
        dispatch: PropTypes.func
    },

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            name: null,
            lastName: null,
            email: null,
            password: null,
            chargeValue: 500,
            chargeCurrency: 'RUB',
            correctScorePoints: 5,
            correctDifferencePoints: 3,
            correctResultPoints: 2
        }
    },

    onSubmit(e) {
        e.preventDefault();

        const {dispatch} = this.props;
        const {
            chargeValue,
            chargeCurrency,
            name,
            correctResultPoints,
            correctDifferencePoints,
            correctScorePoints,
            free
        } = this.state;
        const charge = !free && {
            value: chargeValue,
            currency: chargeCurrency
        };

        const data = {
            name,
            rules: {
                free,
                points: {
                    score: correctScorePoints,
                    difference: correctDifferencePoints,
                    result: correctResultPoints
                },
                charge
            },
            ownerCharge: !free
        };

        dispatch(createRoom(data));
    },

    render() {
        const {intl: {formatMessage}, room, room: {message, creating}} = this.props;
        const {
            chargeValue,
            chargeCurrency,
            name,
            correctResultPoints,
            correctDifferencePoints,
            correctScorePoints,
            free
        } = this.state;

        const nameError = _.get(message, ['name', 'kind']);
        const scoreError = _.get(message, ['rules.points.score', 'kind']);
        const resultError = _.get(message, ['rules.points.result', 'kind']);
        const differenceError = _.get(message, ['rules.points.difference', 'kind']);
        const chargeValueError = _.get(message, ['rules.charge.value', 'kind']);

        return (
            <div className="room-create">

                <form onSubmit={this.onSubmit}>
                    <h2>{formatMessage({id: 'RoomCreate.createARoom'})}</h2>
                    <div className="room-create__description">
                        <FormattedHTMLMessage id="RoomCreate.description" />
                    </div>
                    <div className="room-create__form-fields">
                        <Input
                            fullWidth
                            errorText={nameError && formatMessage({id: `RoomCreate.${nameError}`})}
                            mix='room-nameError'
                            onChange={e => this.setState({name: e.target.value})}
                            floatingLabelText={formatMessage({id: 'RoomCreate.name'})} />
                        <div className="room-create__points">
                            <h2>{formatMessage({id: 'RoomCreate.pointsScheme'})}</h2>
                            <Input
                                fullWidth
                                value={correctScorePoints}
                                type="number"
                                errorText={scoreError && formatMessage({id: `RoomCreate.${scoreError}`})}
                                mix='room-create__input'
                                onChange={e => this.setState({correctScorePoints: e.target.value})}
                                floatingLabelText={formatMessage({id: 'RoomCreate.correctScorePoints'})} />
                            <Input
                                fullWidth
                                value={correctDifferencePoints}
                                type="number"
                                errorText={differenceError && formatMessage({id: `RoomCreate.${differenceError}`})}
                                mix='room-create__input'
                                onChange={e => this.setState({correctDifferencePoints: e.target.value})}
                                floatingLabelText={formatMessage({id: 'RoomCreate.correctDifferencePoints'})} />
                            <Input
                                fullWidth
                                value={correctResultPoints}
                                type="number"
                                errorText={resultError && formatMessage({id: `RoomCreate.${resultError}`})}
                                mix='room-create__input'
                                onChange={e => this.setState({correctResultPoints: e.target.value})}
                                floatingLabelText={formatMessage({id: 'RoomCreate.correctResultPoints'})} />
                        </div>
                        <div className="room-create__charge">
                            <h2>{formatMessage({id: 'RoomCreate.whatFor'})}</h2>
                            <div className="room-create__charge-description">
                                {formatMessage({id: 'RoomCreate.chargeDescription'})}
                            </div>
                            <Checkbox
                                mix="room-create__charge-currency"
                                onCheck={e => this.setState({free: e.target.checked})}
                                label={formatMessage({id: 'RoomCreate.roomIsFree'})}
                                checked={free} />
                            {!free &&
                                <div className="room-create__charge-money">
                                    <Input
                                        mix="room-create__charge-value"
                                        type="number"
                                        value={chargeValue}
                                        errorText={chargeValueError && formatMessage({id: `RoomCreate.${chargeValueError}`})}
                                        onChange={e => this.setState({chargeValue: e.target.value})}
                                        floatingLabelText={formatMessage({id: 'RoomCreate.chargeValue'})} />
                                    <Select
                                        style={{width: '100px'}}
                                        mix="room-create__charge-currency"
                                        value={chargeCurrency}
                                        onChange={(e, i, value) => this.setState({chargeCurrency: value})}>
                                            <MenuItem value="RUB" primaryText="₽" />
                                            <MenuItem value="USD" primaryText="$" />
                                            <MenuItem value="EUR" primaryText="€" />
                                            <MenuItem value="snickers" primaryText="Snickers" />
                                            <MenuItem value="beer" primaryText="Beer" />
                                    </Select>
                                </div>}
                        </div>
                    </div>
                    <Button
                        disabled={creating}
                        style={{marginTop: '30px'}}
                        type="submit"
                        primary
                        mix="room-create__button"
                        label={formatMessage({id: 'RoomCreate.create'}, {creating})} />
                </form>
            </div>
        );
    }
});

function mapStateToProps({room, user}) {
    return {room, user};
}
export default connect(mapStateToProps)(injectIntl(RoomCreate));

