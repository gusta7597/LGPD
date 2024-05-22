import { Component, ReactNode } from "react";
import styles from "./Area.module.css";
import { Session } from "../../../../model/utils/Session";

interface Properties {
    children: ReactNode;
    label: string;
    allowedProfiles: number[] | null;
}

class Area extends Component<Properties> {

    checkProfile () : JSX.Element {
        const session = Session();
        const { allowedProfiles, label, children } = this.props;

        const item: JSX.Element = (
            <div className={ styles.area }>
                <span className={ styles.name }>{ label }</span>
                { children }
            </div>  
        );

        if (allowedProfiles === null) {
            return item;
        } else if (allowedProfiles.includes(session.profile.type)) {
            return item;
        } else {
            return <></>;
        }
    }

    render () {
        return this.checkProfile();
    }
}

export default Area;