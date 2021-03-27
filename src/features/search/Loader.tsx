import React from "react";
import mainStyle from "../../App.module.css";
import styles from "./Search.module.css";

function Loader() {
  return (
    <div className={`${mainStyle.card} ${styles.placeholder_loader}`}>
            <div className={`${styles.mask}  ${styles.name} `}></div>
      <div className={`${styles.mask} ${styles.location}`}></div>
  
    </div>
  );
}

export default Loader;
