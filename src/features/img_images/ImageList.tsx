import React from "react";
import ImageItem from "./ImageItem";
import styles from "../../App.module.css";

interface imageListProps {
  images: Array<[]>;
}
function ImageList({ images }: imageListProps) {
  return (
    <div className={styles.cards}>
      {images.map((item, index) => (
        <ImageItem
          imageList={images}
           currentImage={item}
           index={index}
           key={index}
        />
      ))}
    </div>
  );
}

export default ImageList;
