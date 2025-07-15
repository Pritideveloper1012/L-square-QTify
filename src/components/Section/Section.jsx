import Card from "../Card/Card"; // ✅ correct import

import Carousel from "../Carousel/Carousel";
import { useEffect, useState } from "react";
import axios from "axios";


const Section = ({ title, fetchUrl }) => {
  const [albumData, setAlbumData] = useState([]);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    axios.get(fetchUrl).then((res) => setAlbumData(res.data));
  }, [fetchUrl]);

   const toggleCollapse = () => {
    setCollapse((prev) => !prev);
  };

  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2>{title}</h2>
        <button onClick={toggleCollapse}>
          {collapse ? "Show All" : "Collapse"}
        </button>
      </div>

      {collapse ? (
        <Carousel
          data={albumData}
          renderComponent={(item) => <Card data={item} />}
        />
      ) : (
        <div className="grid">
          {albumData.map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;
