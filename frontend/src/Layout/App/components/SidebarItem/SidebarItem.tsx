import { Component } from "react";
import { IconType } from "react-icons";
import { Link, LinkProps } from "react-router-dom";
import { FaCircleNotch, FaHome, FaUser } from "react-icons/fa";
import { Session } from "../../../../model/utils/Session";
import styles from "./SidebarItem.module.css";

interface Properties extends LinkProps {
    label: string;
    icon: string;
    allowedProfiles: number[] | null;
}

class SidebarItem extends Component<Properties> {
    static mapIcons () : { [ key: string ]: IconType } {
        return {
            home: FaHome,
            user: FaUser
        }
    };

    checkProfile () : JSX.Element {
        const session = Session();
        const { label, icon, to, allowedProfiles } = this.props;
        const Icon: IconType = SidebarItem.mapIcons()[icon] || FaCircleNotch;

        const item: JSX.Element = (
            <Link to={ to } className={ styles.sidebarItem }>
                <Icon className={ styles.icon } />
                { label }
            </Link>
        );

        if (allowedProfiles === null) {
            return item;
        } else if (allowedProfiles.includes(session.profile.type)) {
            return item;
        } else {
            return <></>;
        }
    }

    render () : JSX.Element {
        return this.checkProfile();
    }
}

export default SidebarItem;