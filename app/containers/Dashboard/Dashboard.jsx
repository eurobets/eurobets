import React from 'react';
import {injectIntl} from 'react-intl';

import Button from '../../components/Button/Button.jsx';

import '../../i18n/ru';

const Dashboard = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    render() {
        const {router} = this.context;
        const {intl} = this.props;

        return (
            <div className="dashboard">
                <Button
                    onClick={() => router.push('/rooms/create/')}
                    label={intl.formatMessage({id: 'Dashboard.createNewRoom'})} />
            </div>
        );
    }
});

export default injectIntl(Dashboard);

