import React from "react";
import PropTypes from "prop-types";
export class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        }
        document.addEventListener('keyup', (evt) => evt.key === 'Escape' && this.hideIfCanBeHidden())
    }
    componentDidUpdate(oldProps, oldState) {
        if (this.state.isVisible && !oldState.isVisible) {
            this.props.onShow && this.props.onShow();
        }
    }
    hideIfCanBeHidden() {
        if (this.getButtons() && this.state.isVisible) {
            this.hide();
        }
    }
    hide() {
        if (this.props.onHide && this.state.isVisible) {
            this.props.onHide();
        }
        this.setState({
            isVisible: false
        });
    }
    show() {
        this.setState({
            isVisible: true
        });
    }
    getContent() {
        return this.props.children;
    }
    getButtons() {
        return (<div><button onClick={() => this.hide()}>Schließen</button></div>)
    }
    render() {
        const props = this.props;
        const style = {
            display: this.state.isVisible ? 'flex' : 'none'
        }
        const popupSize = {
            width: this.props.width || '500px',
            height: this.props.height || '300px'
        }
        return (
            <div onClick={() => this.hideIfCanBeHidden()} className='popup-underlay' style={style}>
                <div className='popup' onClick={(e) => e.stopPropagation()} style={popupSize}>
                    <div>{props.title}</div>
                    {this.getContent()}
                    {this.getButtons()}
                </div>
            </div>
        );
    }
} 

Popup.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    onHide: PropTypes.func,
    onShow: PropTypes.func
};