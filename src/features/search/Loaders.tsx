import React from "react";
import styles from "../../App.module.css";
import Loader from "./Loader";

function Loaders() {
  return (
    <div className="searching">
      <div className={styles.cards}>

          {
              [1,2,3,4,5,6].map(i => (
                   <Loader key={i} />
              ))
          }
      </div>
    </div>
  );
}

export default Loaders;
