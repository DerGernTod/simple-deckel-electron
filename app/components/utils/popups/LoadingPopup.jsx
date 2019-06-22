import React from "react";
import PropTypes from "prop-types";
import { Popup } from "./Popup";

export class LoadingPopup extends Popup {
    constructor(props) {
        super(props);
        this.state = {
            timeoutId: -1
        };
    }
    componentDidUpdate(oldProps) {
        if (oldProps.isLoading && !this.props.isLoading) {
            clearTimeout(this.state.timeoutId);
            this.hide();
        }
        if (!oldProps.isLoading && this.props.isLoading) {
            this.setState({
                timeoutId: setTimeout(() => this.show(), 100)
            });
        }
    }
    getContent() {
        return (<div className="spinner">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-eclipse" style={{background: 'none'}}>
                <path ng-attr-d="{{config.pathCmd}}" ng-attr-fill="{{config.color}}" stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="ffa07a" transform="rotate(53.4218 50 51)">
                    <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
                </path>
            </svg>
        </div>);
    }
    getButtons() {
        return null;
    }
}

LoadingPopup.propTypes = {
    ...Popup.propTypes,
    isLoading: PropTypes.bool.isRequired
};