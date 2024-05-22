import { Component } from 'react';
import Styles from './Button.module.css';
import { IconType } from 'react-icons';
import { FaSignOutAlt } from 'react-icons/fa';

interface ButtonProps {
    onClick?: () => void;
    type: "button" | "submit" | "reset";
    className: string;
    placeholder?: string;
    icon?: string;
}

class Button extends Component<ButtonProps> {
    static mapIcons () : { [ key: string ]: IconType } {
        return {
            logout: FaSignOutAlt,
        }
    };

    render() {
        const { onClick, type, className, placeholder, icon } = this.props;

        const Icon: IconType | null = icon !== undefined ? Button.mapIcons()[icon] : null;

        return (
            <button className={`${Styles[className]}`} onClick={onClick} type={type}>
                { Icon && <Icon /> }
                <div>{ placeholder }</div>
            </button>
        );
    }
}

export default Button;
