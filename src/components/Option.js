import "./UI/option.css";
import theme from "../config/theme";
import { useState } from "react";
import ImageUploader from "./imageUpload";
import api from "../config/api";

function Options(props) {
  let currentUser = props.currentUser;
  const [UploadImage, setUploadImage] = useState(false);
  function selectImage() {
    setUploadImage(!UploadImage);
  }
  async function upload(image) {
    try {
      fetch(api.domain + api.postProfilePic, {
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
      console.log(image);
    } catch (error) {
      props.displayMessage(error, true);
    }
  }
  return (
    <div className="options">
      {UploadImage ? (
        <ImageUploader
          upload={upload}
          displayMessage={props.displayMessage}
          cancel={selectImage}
        ></ImageUploader>
      ) : (
        <div></div>
      )}
      <button
        style={theme.accent_button}
        className="uploadButton"
        onClick={selectImage}
      >
        {currentUser.profile === "undefined" ? "Upload Photo" : "Change Photo"}
      </button>
    </div>
  );
}
export default Options;
