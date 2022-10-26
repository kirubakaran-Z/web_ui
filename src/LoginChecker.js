import Login from "./pages/login";
import Register from "./pages/register";
import theme from "./config/theme";
import API from "./config/api";
import HomePage from "./pages/homepage";
import User from "./class/user";
import { useState, useEffect } from "react";
import cookieService from "./service/cookieService";
function LogInChecker() {
  let token = cookieService.get("token");
  const [Route, setRoute] = useState(() => {
    return "Login";
  });
  const [Page, setPage] = useState(() => {
    return <div></div>;
  });
  const [Message, setMessage] = useState(() => {
    return "";
  });
  const [Registered, setRegistered] = useState(() => {
    return false;
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setRegistered(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [Registered]);
  useEffect(() => {
    async function getuser(token) {
      try {
        let Response = await fetch(API.domain + API.getUserURL, {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        });
        let data = await Response.json();
        if (data.status) {
          let user = new User();
          user.email_id = data.user.email_id;
          user.address = data.user.address;
          user.name = data.user.name;
          user.id = data.user.id;
          user.phoneno = data.user.phoneno;
          user.dob = data.user.dob;
          user.token = data.user.token;
          user.user_role = data.user.user_role;
          user.password = "";
          user.profile = data.user.profile;
          setPage(
            <HomePage currentUser={user} changeRoute={changeRoute}></HomePage>
          );
        } else {
          setMessage(data.message);
          setPage(<Login changeRoute={changeRoute}></Login>);
        }
      } catch (error) {
        setMessage(error.message);
        setPage(<Login changeRoute={changeRoute}></Login>);
      }
    }
    if (token !== "" && token !== undefined) {
      getuser(token);
      console.log(token);
    }
  }, [token]);
  function changeRoute(route, registered) {
    setRoute(route);
    setRegistered(registered);
  }
  const pages = cookieService.get("token") ? (
    Page
  ) : Route === "Login" ? (
    <div>
      <div style={Registered ? theme.validation(false) : theme.novalidation}>
        Registered Successfully
      </div>
      <Login changeRoute={changeRoute}></Login>
    </div>
  ) : (
    <Register changeRoute={changeRoute}></Register>
  );
  return (
    <div className="LogInChecker">
      <div style={Message === "" ? theme.novalidation : theme.validation(true)}>
        {Message}
      </div>
      {pages}
    </div>
  );
}

export default LogInChecker;
