import React, { Component } from 'react';
import Styles from './Logo.module.css';
import LogoFile from '../../assets/joinLogo.svg';

interface LogoProps {
    size: "small" | "medium" | "big";
  }

class Logo extends Component<LogoProps> {

private getDynamicSize() {
    const {size} = this.props;
    switch (size) {
        case 'big':
            return Styles.big;
        case 'medium':
            return Styles.medium;
        default:
            return Styles.small;
    }
}

render() {
    return (
        <div
            className={Styles.logo + ' ' + this.getDynamicSize()}
            ><img src={LogoFile} alt="logo" className={Styles.picture} /></div>
    );
}
}

export default Logo;