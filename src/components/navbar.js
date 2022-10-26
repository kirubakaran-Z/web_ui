import "./UI/NavBar.css";
import theme from "../config/theme";
import TextLogo from "../assets/logo white text.png";
import { useState } from "react";
function NavBar(props) {
  const [ProfileClick, setProfileClick] = useState(false);

  return (
    <nav className="NavBar" style={theme.kdark_background}>
      <div onClick={() => props.UpdateDrawer(true)} className="toogle">
        <div className="tooglebutton"></div>
        <div className="tooglebutton"></div>
        <div className="tooglebutton"></div>
      </div>
      <img src={TextLogo} alt="Logo Text"></img>
      <div className="userbtn" onClick={() => setProfileClick(true)}>
        {props.Profile === "undefined" ? (
          <div className="profile" style={theme.accent_background}>
            {props.UserName.substring(0, 1).toUpperCase()}
          </div>
        ) : (
          <div className="profile" style={theme.accent_background}>
            {<img src={props.Profile} alt=""></img>}
          </div>
        )}
        {ProfileClick ? (
          <div className="profiledrop">
            <div
              className="dropdowns"
              onMouseLeave={() => setProfileClick(false)}
            >
              <div>
                {props.Profile === "undefined" ? (
                  <div className="profile-big" style={theme.accent_background}>
                    {props.UserName.substring(0, 1).toUpperCase()}
                  </div>
                ) : (
                  <div className="profile-big" style={theme.accent_background}>
                    <img src={props.Profile} alt=""></img>
                  </div>
                )}
              </div>
              <span>
                {props.UserName.substring(0, 1).toUpperCase() +
                  props.UserName.substring(
                    1,
                    props.UserName.length
                  ).toLowerCase()}
              </span>
              <span className="MailId">{props.email_id}</span>
              <div className="profile-buttom">
                <button
                  style={theme.normal_button}
                  onClick={() => props.changeMainRoute("/options")}
                >
                  Options
                </button>
                <button style={theme.accent_button} onClick={props.logout}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
}
export default NavBar;
