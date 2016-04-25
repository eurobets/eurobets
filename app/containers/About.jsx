import React from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/about';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = props => {
    return (
        <div className={cx('about')}>
            <h1 className={cx('about__header')}>About Euro Bets</h1>
            <div className={cx('about__description')}>
                <p>
                    Bla-bla-bla
                </p>
            </div>
        </div>
    );
};

export default About;
