import { useState } from "react";
import FileBase64 from "react-file-base64";
import "./UI/option.css";
import theme from "../config/theme";

function ImageUploader(props) {
  const [image, setImage] = useState("");
  return (
    <div className="imageUploader">
      {image === "" ? (
        <div className="files">
          <FileBase64
            multiple={true}
            onDone={(e) => {
              console.log(parseInt(e[0].size));
              if (parseInt(e[0].size) < 20000) {
                setImage(e[0].base64);
              } else {
                props.displayMessage("Upload an image less that 20 MB", true);
              }
            }}
          ></FileBase64>
        </div>
      ) : (
        <img src={image} alt="" className="preview"></img>
      )}
      <div style={{ display: "flex", gap: "10px" }}>
        {image !== "" ? (
          <button
            style={theme.accent_button}
            onClick={() => {
              props.upload(image);
            }}
          >
            Upload
          </button>
        ) : (
          <div></div>
        )}
        <button
          style={theme.normal_button}
          onClick={() => {
            console.log(props.cancel());
          }}
        >
          {" "}
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ImageUploader;
