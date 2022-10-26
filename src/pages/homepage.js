import cookieService from "../service/cookieService";
import NavBar from "../components/navbar";
import Main from "../components/Main";
import "./UI/Homepage.css";
import Palet from "../config/color";
import { useState, useEffect } from "react";
import Drawer from "../components/drawer";
import Options from "../components/Option";
import theme from "../config/theme";
import Gallery from "../components/gallery";
import UserTable from "../components/userTable";

function HomePage(props) {
  let [Message, setMessage] = useState(() => {
    return "";
  });
  let [Type, setType] = useState(() => {
    return true;
  });
  let currentUser = props.currentUser;
  const [MainRoute, SetMainRoute] = useState(() => {
    return "/MainRoute";
  });
  const [openDrawer, SetopenDrawer] = useState(() => {
    return false;
  });
  const [MainContent, SetMainContent] = useState(() => {
    return (
      <div>
        <h1>Main content</h1>
      </div>
    );
  });
  function logout() {
    props.changeRoute("Login");
    cookieService.set("token", "");
  }
  function changeMainRoute(value) {
    SetMainRoute(value);
  }
  function updateDrawer() {
    SetopenDrawer(!openDrawer);
  }
  function displayMessage(message, type) {
    setMessage(message);
    setType(type);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
      setType(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [Message]);
  useEffect(() => {
    function showContent(route) {
      if (route === "/MainRoute") {
        SetMainContent(<Main Token={currentUser.token}></Main>);
        return;
      }
      if (route === "/gallery") {
        SetMainContent(
          <Gallery
            Token={currentUser.token}
            currentUser={currentUser}
            displayMessage={displayMessage}
          ></Gallery>
        );
        return;
      }
      if (route === "/options") {
        SetMainContent(
          <div>
            <Options
              currentUser={currentUser}
              displayMessage={displayMessage}
            ></Options>
          </div>
        );
        return;
      }
      if (route === "/Users") {
        SetMainContent(
          <div>
            <UserTable></UserTable>
          </div>
        );
        return;
      }
    }
    showContent(MainRoute);
  }, [MainRoute, currentUser]);

  return (
    <div className="HomePage">
      <div
        className="Drawer"
        style={openDrawer ? { width: "260px" } : { width: "0px" }}
      >
        <Drawer
          UserRole={currentUser.user_role}
          page={MainRoute}
          changeMainRoute={changeMainRoute}
          updateDrawer={updateDrawer}
        ></Drawer>
      </div>
      <div
        onClick={updateDrawer}
        className="belowDrawer"
        style={openDrawer ? { display: "flex" } : { display: "none" }}
      ></div>
      <NavBar
        logout={logout}
        changeMainRoute={changeMainRoute}
        UserName={currentUser.name}
        Profile={currentUser.profile}
        email_id={currentUser.email_id}
        UpdateDrawer={updateDrawer}
      ></NavBar>
      <main style={{ background: Palet.Kdark50 }}>{MainContent}</main>
      <div style={Message === "" ? theme.novalidation : theme.validation(Type)}>
        {Message}
      </div>
    </div>
  );
}

export default HomePage;
