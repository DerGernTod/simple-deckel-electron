import React from "react";

export class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: props.isVisible
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isVisible: nextProps.isVisible
        });
    }
    hide() {
        if (this.props.onHide) {
            this.props.onHide();
        }
        this.setState({
            isVisible: false
        });
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
            <div onClick={() => this.hide()} className='popup-underlay' style={style}>
                <div className='popup' onClick={(e) => e.stopPropagation()} style={popupSize}>
                    <div>{props.title}</div>
                    <div>{props.children}</div>
                </div>
            </div>
        );
    }
} 