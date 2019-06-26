import React from 'react';
import SimpleKeyboard from "react-simple-keyboard";
import PropTypes from 'prop-types';
const german = {
    default: [
        "^ 1 2 3 4 5 6 7 8 9 0 ß ´ {bksp}",
        "{tab} q w e r t z u i o p ü +",
        "{lock} a s d f g h j k l ö ä # {enter}",
        "{shift} < y x c v b n m , . - {shift}",
        ".com @ {space} {close}"
    ],
    shift: [
        '° ! " § $ % & / ( ) = ? ` {bksp}',
        "{tab} Q W E R T Z U I O P Ü *",
        "{lock} A S D F G H J K L Ö Ä ' {enter}",
        "{shift} > Y X C V B N M ; : _ {shift}",
        ".com @ {space} {close}"],
};

export class GermanKeyboard extends React.Component {
    handleShift(key) {
        if (key === "{lock}" || key === "{shift}") {
            let currentLayout = this.keyboard.options.layoutName;
            let layoutName = currentLayout === "default" ? "shift" : "default";
            this.keyboard.setOptions({
              layoutName
            });
        }
        if (key === "{enter}" || key === "{close}") {
            this.props.hide();
        }
    }
    componentWillReceiveProps(newProps) {
        if (this.props.target !== newProps.target) {
            this.keyboard.setOptions({
                layoutName: 'default'
            });
        }
        this.keyboard.setInput(newProps.inputValue, newProps.target);
    }
    render() {
        return (
            <React.Fragment>
                <div className='keyboard' style={{display: this.props.target ? 'block' : 'none'}}>
                    <SimpleKeyboard {...this.props}
                        ref={keyboard => this.keyboard = keyboard && keyboard.keyboard}
                        layout={german}
                        inputName={this.props.target}
                        mergeDisplay={true}
                        display={{
                            '{close}': 'Schließen',
                            '{tab}': '↹',
                            '{shift}': '⇧',
                            '{lock}': '⇩',
                            '{enter}': '↵',
                            '{bksp}': '←'
                        }}
                        buttonTheme={[{
                            class: 'close-button',
                            buttons: '{close} {enter}'
                        }, {
                            class: 'medium-button',
                            buttons: '{enter} .com'
                        }, {
                            class: 'large-button',
                            buttons: '{bksp} {shift}'
                        }, {
                            class: 'x-large-button',
                            buttons: '{close}'
                        }]}
                        onKeyPress={(key) => this.handleShift(key)}
                    />
                </div>
            </React.Fragment>
        )
    }
};

GermanKeyboard.propTypes = {
    onChange: PropTypes.func.isRequired,
    target: PropTypes.string.isRequired,
    inputValue: PropTypes.string.isRequired,
    hide: PropTypes.func.isRequired
};