'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import b from 'b_';
import cx from 'classnames';

import './popup.scss';

var Popup = React.createClass({
    propTypes: {
        arrowOffsetLeft: React.PropTypes.string,
        arrowOffsetTop: React.PropTypes.string,
        autoclosable: React.PropTypes.bool,
        axis: React.PropTypes.string,
        children: React.PropTypes.node,
        direction: React.PropTypes.string,
        hasArrow: React.PropTypes.bool,
        maxHeight: React.PropTypes.number,
        mix: React.PropTypes.string,
        onToggle: React.PropTypes.func,
        selfclosable: React.PropTypes.bool,
        style: React.PropTypes.object,
        title: React.PropTypes.string,
        theme: React.PropTypes.string,
        width: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            autoclosable: false,
            axis: 'center',
            direction: 'bottom',
            theme: 'normal'
        };
    },

    getInitialState: function () {
        return {
            shown: this.props.shown,
            position: {left: 0, top: 0},
            arrowOffsetLeft: this.props.arrowOffsetLeft,
            arrowOffsetTop: this.props.arrowOffsetTop
        };
    },

    componentWillMount: function () {
        var self = this;

        self._closePopupIfClickedOutside = function (e) {
            if (!self.state.shown) {
                return;
            }

            if (self.clickedOutsideElement(e, self.refs.popup)) {
                self.hide();
            }
        };

        self._bindClosePopupIfClickedOutside = function () {
            $(document).on('click', self._closePopupIfClickedOutside);
        };
        self._unbindClosePopupIfClickedOutside = function () {
            $(document).unbind('click', self._closePopupIfClickedOutside);
        };
    },

    componentDidMount: function () {
        this.popup = $(ReactDOM.findDOMNode(this));

        if (this.props.shown && this.props.autoclosable) {
            window.setTimeout(this._bindClosePopupIfClickedOutside, 0);
        }
    },

    componentWillUnmount: function () {
        this._unbindClosePopupIfClickedOutside();
    },

    setOwner: function (owner) {
        this.owner = owner;
        this.updatePositions();
        return this;
    },

    hide: function () {
        this.setState({shown: false});
        if (this.props.onToggle) {
            this.props.onToggle({shown: false});
        }
        if (this.props.autoclosable) {
            this._unbindClosePopupIfClickedOutside();
        }
    },

    show: function () {
        this.setState({shown: true});
        if (this.props.onToggle) {
            this.props.onToggle({shown: true});
        }
        if (this.props.autoclosable) {
            this._bindClosePopupIfClickedOutside();
        }
    },

    toggle: function () {
        this.state.shown ? this.hide() : this.show();  // eslint-disable-line no-unused-expressions
    },

    clickedOutsideElement: function (e, element) {
        var eventTarget = e.target || e.srcElement;

        while (eventTarget !== null) {
            if (eventTarget === element) {
                return false;
            }
            eventTarget = eventTarget.offsetParent;
        }

        return true;
    },

    /* eslint-disable complexity */
    updatePositions: function () {
        var position = this.owner ? this.owner.position() : {left: 0, top: 0};
        var ownerHeight = this.owner ? this.owner.outerHeight() : 0;
        var ownerWidth = this.owner ? this.owner.outerWidth() : 0;
        var popupHeight = this.popup ? this.popup.outerHeight() : 0;
        var popupWidth = this.popup ? this.popup.outerWidth() : 0;
        var axis = this.props.axis;

        /**
         * TODO: position: left, right; axis: top, middle, bottom
         */
        switch (this.props.direction) {
            case 'top':
                position.top -= popupHeight;
                break;
            case 'top-right':
                position.top -= popupHeight;
                position.left += ownerWidth;
                axis = null;
                break;
            case 'bottom':
                position.top += ownerHeight;
                break;
            default:
                break;
        }
        switch (axis) {
            case 'right':
                position.left += (ownerWidth - popupWidth);
                if (this.state.arrowOffsetLeft === undefined) {
                    this.setState({
                        arrowOffsetLeft: popupWidth > ownerWidth
                            ? popupWidth - ownerWidth / 2
                            : popupWidth / 2
                    });
                }
                break;
            case 'left':
                if (this.state.arrowOffsetLeft === undefined) {
                    this.setState({
                        arrowOffsetLeft: popupWidth > ownerWidth
                            ? ownerWidth / 2
                            : popupWidth / 2
                    });
                }
                break;
            case 'center':
                position.left += (ownerWidth - popupWidth) / 2;
                break;
            default:
                break;
        }
        this.setState({position: position});
    },
    /* eslint-enable complexity */

    renderArrow: function () {
        var style = {
            left: this.state.arrowOffsetLeft,
            top: this.state.arrowOffsetTop
        };
        return (
            <i className="popup__arrow" style={style} />
        );
    },

    renderTitle: function () {
        return (
            <h3 className="popup__title">{this.props.title}</h3>
        );
    },

    render: function () {
        var classes = b('popup', {
            theme: this.props.theme,
            direction: this.props.direction,
            shown: this.state.shown,
            'with-arrow': this.props.hasArrow
        });
        var style = {
            left: this.state.position.left,
            top: this.state.position.top,
            width: this.props.width,
            maxHeight: this.props.maxHeight,
            ...this.props.style
        };

        return (
            <span
                className={`${classes} ${this.props.mix || ''}`}
                onClick={this.props.selfclosable && this.hide}
                ref="popup"
                style={style}>
                    {this.props.hasArrow && this.renderArrow()}
                    {this.props.title && this.renderTitle()}
                    <span className="popup__content">
                        {this.props.children}
                    </span>
            </span>
        );
    }
});

export default Popup;
