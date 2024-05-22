import React from "react";
import styles from "./Breadcrumb.module.css";
import { FaAngleRight } from "react-icons/fa";

interface BreadCrumbProps {
    area: string;
    pages: string[];
}

class Breadcrumb extends React.Component<BreadCrumbProps> {
    render() {
        const { area, pages } = this.props;

        return (
            <div className={ styles.breadcrumb }>
                <span>{ area }</span>
                {
                    pages.map(page => (
                        <span key={ page }>
                            <FaAngleRight />
                            { page }
                        </span>
                    ))
                }
            </div>
        );
    }
}

export default Breadcrumb;
