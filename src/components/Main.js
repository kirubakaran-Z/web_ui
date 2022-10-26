import { useEffect, useState } from "react";
import API from "../config/api";
import Loader from "./Loader";
import { motion } from "framer-motion";
import Theme from "../config/theme";
import "./UI/main.css";
function Main(props) {
  const token = props.Token;
  const [loader, setloader] = useState(() => {
    return true;
  });
  const [count, setCount] = useState(() => {
    return 0;
  });
  const [Gallery, setGallery] = useState(() => {
    return [];
  });
  useEffect(() => {
    async function featchGalleryOnShow() {
      try {
        fetch(API.domain + API.GetGalearyDisplay, {
          method: "GET",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            token: token,
          },
        })
          .then((Response) => Response.json())
          .then((data) => {
            if (data.status) {
              setGallery(data.data);
              setloader(false);
            } else {
              console.log(data.message);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
    featchGalleryOnShow();
  }, [token]);
  const MINUTE_MS = 3000;
  useEffect(() => {
    let value = 0;
    if (Gallery.length !== 0) {
      const interval = setInterval(() => {
        if (value >= Gallery.length - 1) {
          setCount(0);
          value = 0;
        } else {
          setCount((prev) => prev + 1);
          value++;
        }
      }, MINUTE_MS);
      return () => clearInterval(interval);
    }
  }, [Gallery]);
  const Gallerytems = Gallery.map((image) => (
    <div className="WallHolder" key={image.id}>
      <img src={image.data} alt={image.name} className="wallpaper"></img>
    </div>
  ));
  return (
    <div className="Main">
      {loader ? (
        <Loader></Loader>
      ) : (
        <div className="Main-sub">
          <motion.div
            className="wallpaperHolder"
            animate={{ marginLeft: -(count * 100) + "vw" }}
          >
            {Gallerytems}
          </motion.div>
          <div className="displayElement">
            <div className="blurrr">
              <span>
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups.
              </span>
              <button style={Theme.normal_button}>Book Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
