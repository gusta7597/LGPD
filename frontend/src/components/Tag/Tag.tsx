import { Component } from "react";
import styles from "./Tag.module.css";

interface Properties {
    label: string;
    type: "success" | "error" | "warning" | "info";
}

class Tag extends Component<Properties> {
    render () {
        const { label, type } = this.props;

        return (
            <div className={` ${ styles.tag } ${ styles[type] } `}>
                <p>{ label }</p>
            </div>
        );
    }
}

export default Tag;