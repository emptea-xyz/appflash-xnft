import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faQuestion,
  faRandom,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import data from "../assets/data.json";

export default function Home() {
  const [items, setItems] = useState<
    {
      name: string;
      description: string;
      tags: string[];
      image_url: string;
      project_url: string;
    }[]
  >([]);
  useEffect(() => {
    setItems(data);
  }, []);
  return (
    <div className="home">
      <div className="breadcrumbs">
        <div className="breadcrumbs-title">Emptea Catalog</div>
      </div>
      <div className="top-spacer"></div>
      <div className="search-bar-container">
        <div className="search-bar">
          <button className="filter-button">
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <input type="text" />
          <button className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="blender-top"></div>
      <div className="items">
        <div className="items-grid">
          {items.map((i) => (
            <div className="item">
              <div className="item-content">
                <div className="item-image">
                  <img src={i.image_url} alt={i.name} />
                </div>
                <div className="item-name-box">
                  <div className="item-name">
                    {i.name.length > 9
                      ? i.name[0] +
                        i.name[1] +
                        i.name[2] +
                        i.name[3] +
                        i.name[4] +
                        i.name[5] +
                        i.name[6] +
                        i.name[7] +
                        "..."
                      : i.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="blender-bottom"></div>
      <div className="socials">
        <button>
          <FontAwesomeIcon icon={faRandom} />
        </button>
        <button>
          <FontAwesomeIcon icon={faQuestion} />
        </button>
      </div>
    </div>
  );
}
