import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs, Tab } from "@mui/material";
import Section from "../Section/Section"; // Reused component

const SongsSection = () => {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");

  useEffect(() => {
    axios.get("https://qtify-backend-labs.crio.do/songs").then((res) => {
      setSongs(res.data);
    });
    axios.get("https://qtify-backend-labs.crio.do/genres").then((res) => {
      setGenres(res.data.data);
    });
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedGenre(newValue);
  };

  const filteredSongs =
    selectedGenre === "all"
      ? songs
      : songs.filter((song) => song.genre.key === selectedGenre);

  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2>Songs</h2>
      </div>

      <Tabs value={selectedGenre} onChange={handleTabChange} className="custom-tabs">
        <Tab label="All" value="all" />
        {genres.map((genre) => (
          <Tab key={genre.key} label={genre.label} value={genre.key} />
        ))}
      </Tabs>

      <Section
        title=""
        fetchUrl="" // No need here, we're passing data manually
        data={filteredSongs}
        isSongs={true}
      />
    </div>
  );
};

export default SongsSection;
