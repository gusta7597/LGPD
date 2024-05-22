import React, { Component, ChangeEvent } from 'react';
import Styles from './InputText.module.css';

interface InputTextProps {
  maxLength : number;
  value: string;
  mytype: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>, isCpf?: boolean) => void;
  placeholder?: string;
  isCpf?: boolean;
}

class InputText extends Component<InputTextProps> {
    render() {
        const { maxLength, value, onChange, placeholder, mytype, label } = this.props;
        return (
            <div className={ Styles.inputGroup }>
                <label>{ label }</label>
                <input
                    maxLength={ maxLength }
                    className={Styles.inputText}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    type={mytype}
                />
            </div>
        );
    }
}

export default InputText;
