import React from "react";
import styles from "./Card.module.css";
import Chip from "@mui/material/Chip";

function Card({ data, type }) {
  const { image, title, follows, likes } = data;

  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.cardImage} />
      <div className={styles.cardBottom}>
        <Chip
          label={
            type === "song"
              ? `${likes} Likes`
              : `${follows} Follows`
          }
          size="small"
        />
        <p className={styles.cardTitle}>{title}</p>
      </div>
    </div>
  );
}

export default Card;
