import React from "react";
import styles from "./Card.module.css";
import Chip from "@mui/material/Chip";

function Card({ image, title, follows }) {
  // console.log("Card props album:", album);
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.cardImage} />
      <div className={styles.cardBottom}>
        <Chip label={`${follows} Follows`} size="small" />
        <p className={styles.cardTitle}>{title}</p>
      </div>
    </div>
  );
}

export default Card;
