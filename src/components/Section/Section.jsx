import Card from "../Card/Card"; // ✅ correct import
import Carousel from "../Carousel/Carousel";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tab, Tabs } from "@mui/material";

const Section = ({ title, fetchUrl, type }) => {
  const [data, setData] = useState([]);
  const [collapse, setCollapse] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Fetch album or song data
 
  // Fetch album or song data
  useEffect(() => {
    axios.get(fetchUrl).then((res) => {
      if (res.data.data) {
        setData(res.data.data); // For songs
      } else {
        setData(res.data); // For albums
      }
    });
  }, [fetchUrl]);

  // Fetch genres for songs
  useEffect(() => {
    if (type === "song") {
      axios
        .get("https://qtify-backend-labs.crio.do/genres")
        .then((res) =>
          setGenres(["All", ...res.data.data.map((g) => g.label)])
        );
    }
  }, [type]);

  // Filter songs by genre
  const getFilteredData = () => {
    if (type !== "song" || selectedGenre === "All") return data;
    return data.filter((song) => song.genre.label === selectedGenre);
  };

  const handleCollapseToggle = () => {
    setCollapse((prev) => !prev);
  };

  // Debug console (optional)
  // console.log("Section:", title, "| Type:", type, "| Data length:", data.length);
  // console.log("Genres:", genres);
  // console.log("FilteredData:", getFilteredData());

  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2>{title}</h2>
        {type !== "song" && (
          <button onClick={handleCollapseToggle}>
            {collapse ? "Show All" : "Collapse"}
          </button>
        )}
      </div>

      {/* Tabs for songs only */}
      {type === "song" && (
        <Tabs
          value={selectedGenre}
          onChange={(e, newValue) => setSelectedGenre(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="song genres tabs"
          className="custom-tabs"
        >
          {genres.map((genre) => (
            <Tab key={genre} label={genre} value={genre} />
          ))}
        </Tabs>
      )}

      {/* Carousel or Grid */}
      {collapse || type === "song" ? (
        <Carousel
          data={Array.isArray(getFilteredData()) ? getFilteredData() : []}
          renderComponent={(item) => (
            <Card data={item} type={type} key={item.id} />
          )}
        />
      ) : (
        <div className="section-grid">
          {Array.isArray(data) &&
            data.map((item) => (
              <Card key={item.id} data={item} type={type} />
            ))}
        </div>
      )}
    </div>
  );
};
export default Section;
