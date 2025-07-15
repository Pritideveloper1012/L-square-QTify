import React, { useEffect, useState } from "react";
import styles from "./Section.module.css";
import Card from "../Card/Card";
import axios from "axios";

function Section({ title, fetchUrl }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
  axios.get(fetchUrl)
    .then((res) => {
      console.log("API Album Data:", res.data); // ✅ Add this
      setAlbums(res.data);
    })
    .catch((err) => console.error("API Error:", err));
}, [fetchUrl]);


  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>{title}</h2>
        <button className={styles.toggleButton}>Collapse</button>
      </div>
      <div className={styles.cardGrid}>
        {albums.map(album => (
          <Card
            key={album.id}
            image={album.image}
            title={album.title}
            follows={album.follows}
          />
        ))}
      </div>
    </div>
  );
}

export default Section;
