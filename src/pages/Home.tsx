import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faQuestion,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
  const [allItems, setAllItems] = useState<
    {
      name: string;
      description: string;
      tags: string[];
      image_url: string;
      project_url: string;
    }[]
  >([]);

  const [items, setItems] = useState<
    {
      name: string;
      description: string;
      tags: string[];
      image_url: string;
      project_url: string;
    }[]
  >([]);
  const [loaded, setLoaded] = useState(false);

  const [id, setId] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const getItems = async () => {
    const url =
      "https://raw.githubusercontent.com/emptea-xyz/data/main/emptea-catalog/items.json";
    const response = fetch(url.toString())
      .then((Response) => Response.json())
      .then((result) => {
        setAllItems(result);
        setItems(result);
      })
      .then(() => setLoaded(true));
  };

  const searchByName = (tag: string) => {
    const filtered = [];
    for (let i = 0; i < allItems.length; i++) {
      if (
        allItems[i].name.toLowerCase().includes(tag.toLowerCase()) ||
        allItems[i].tags.toString().toLowerCase().includes(tag.toLowerCase())
      ) {
        filtered.push(allItems[i]);
      }
    }
    setItems(filtered);
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className="home">
      <div className="breadcrumbs">
        <div className="breadcrumbs-title">
          Emptea <span>Catalog</span>
        </div>
      </div>
      <div className="top-spacer"></div>
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            onChange={(e) => {
              searchByName(e.target.value);
            }}
            placeholder="search for an app or a tag..."
          />
        </div>
      </div>
      <div className="blender-top"></div>
      <div className="items">
        {loaded && (
          <div className="items-grid">
            {items.map((i, index) => (
              <motion.div
                className="item"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                key={index}
              >
                <div className="item-content">
                  <div className="item-image">
                    <button
                      className="item-image-button"
                      onClick={() => {
                        setShowDetails(true);
                        setId(index);
                      }}
                    >
                      <img src={i.image_url} alt={i.name} />
                    </button>
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
              </motion.div>
            ))}
          </div>
        )}
        {!loaded && (
          <div className="spinner">
            <CircularProgress color={"primary"} />
          </div>
        )}
      </div>
      <div className="blender-bottom"></div>
      <div className="socials">
        <button
          onClick={() => {
            setId(Math.floor(Math.random() * items.length));
            setShowDetails(true);
          }}
        >
          <FontAwesomeIcon icon={faRandom} />
        </button>
        <button onClick={() => setShowHelp(true)}>
          <FontAwesomeIcon icon={faQuestion} />
        </button>
      </div>
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="details"
            onClick={() => setShowDetails(false)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <motion.div
              className="details-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="details-panel-content">
                <div className="details-panel-image">
                  <img src={items[id].image_url} alt={items[id].name} />
                </div>
                <div className="details-panel-name">{items[id].name}</div>
                <div className="details-panel-description">
                  {items[id].description}
                </div>
                <motion.div
                  className="details-panel-link"
                  onClick={() => {
                    const text = document.getElementById("dpl-text");

                    text!.innerHTML = "copied!";
                    setTimeout(() => {
                      text!.innerHTML = "copy website";
                    }, 3000);
                    navigator.clipboard.writeText(items[id].project_url);
                  }}
                >
                  <FontAwesomeIcon icon={faCopy} />
                  <div className="details-panel-link-text" id="dpl-text">
                    copy website
                  </div>
                </motion.div>
                <div className="details-panel-tags">
                  {items[id].tags.map((tag, index) => (
                    <div className="details-panel-tag" key={index}>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        {showHelp && (
          <motion.div
            className="details"
            onClick={() => setShowHelp(false)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <motion.div
              className="help-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="details-panel-content">
                <div className="details-panel-name">
                  A brief introduction...
                </div>
                <div className="details-panel-description">
                  There are thousands of products being released on Solana
                  everyday. How should we keep track of all of them?
                  <br />
                  <br />
                  Presenting Emptea catalog.
                  <br />
                  <br />
                  Emptea catalog is a service built by emptea. With our app you
                  can access every product and service on Solana with one app.
                  <br />
                  <br />
                  To list your project create a pull request under
                  github.com/emptea-xyz/data.
                  <br />
                  <br />
                  Make also sure to follow @EmpteaXYZ on twitter!
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
