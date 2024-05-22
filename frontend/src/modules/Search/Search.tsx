import React from "react";
import styles from "./Search.module.css";
import SearchData from "../../components/SearchData/SearchData";

class Search extends React.Component {

  render() {
    return (
      <div className={styles.box}>
        <SearchData />
      </div>
    );
  }
}

export default Search;
