import { useState, useEffect } from "react";
import API from "../config/api";
import theme from "../config/theme";
import Loader from "./Loader";
import ImageUpload from "./imageUpload";
import { triggerBase64Download } from "react-base64-downloader";
import "./UI/Gallery.css";
import * as Icon from "react-bootstrap-icons";
import roles from "../config/userrole";
function Gallery(props) {
  let currentUser = props.currentUser;
  const [loader, setloader] = useState(() => {
    return true;
  });
  const [Selected, setSelected] = useState(() => {
    return "";
  });
  const [SelectedDisplay, setSelectedDisplay] = useState(() => {
    return false;
  });
  const [Gallery, setGallery] = useState(() => {
    return [];
  });
  const [UploadImage, setUploadImage] = useState(false);
  function selectImage() {
    setUploadImage(!UploadImage);
  }
  const token = props.Token;
  useEffect(() => {
    async function featchGalleryOnShow() {
      try {
        fetch(API.domain + API.GetGalleryData, {
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
  async function Upload(image) {
    try {
      fetch(API.domain + API.addImagetoGallery, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          token: currentUser.token,
        },
        body: JSON.stringify({
          image: image,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            props.displayMessage(data.message, false);
            selectImage();
          } else {
            props.displayMessage(data.message, true);
          }
        });
    } catch (error) {
      props.displayMessage(error, true);
    }
  }
  const Gallerytems = Gallery.map((image) => (
    <img
      src={image.data}
      alt={image.name}
      key={image.id}
      className="galleryPic"
      onClick={() => {
        setSelected(image.data);
        setSelectedDisplay(image.display);
      }}
    ></img>
  ));
  console.log(currentUser);
  return (
    <div className="Gallery">
      {Selected === "" ? (
        <div></div>
      ) : (
        <div className="Selected">
          <div className="options-image">
            {currentUser.user_role === roles.SU ? (
              <div className="CheckBox">
                {SelectedDisplay ? (
                  <div style={theme.accent_background}>
                    <Icon.Check></Icon.Check>
                  </div>
                ) : (
                  <div></div>
                )}
                <span>Keep for Display</span>
              </div>
            ) : (
              <div></div>
            )}
            <button
              style={theme.clear_button}
              onClick={() => triggerBase64Download(Selected, "image")}
            >
              <Icon.Download></Icon.Download>
            </button>
            <button style={theme.clear_button} onClick={() => setSelected("")}>
              <Icon.X></Icon.X>
            </button>
          </div>
          <img src={Selected} alt="selected"></img>
        </div>
      )}
      {loader ? (
        <Loader></Loader>
      ) : (
        <div>
          {UploadImage ? (
            <div>
              <ImageUpload
                upload={Upload}
                displayMessage={props.displayMessage}
                cancel={selectImage}
              ></ImageUpload>
            </div>
          ) : (
            <div></div>
          )}
          <button style={theme.accent_button} onClick={selectImage}>
            {" "}
            Add Image
          </button>
          <div className="gallery">{Gallerytems}</div>
        </div>
      )}
    </div>
  );
}
export default Gallery;
