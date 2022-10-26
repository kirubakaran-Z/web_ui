import Palet from "./color";
class Theme {
  card = {
    background: Palet.Kdark50,
    boxShadow: "5px 5px 8px " + Palet.Kdark,
  };
  accent_color = {
    color: Palet.accent,
  };
  inverse_color = {
    color: Palet.inverse,
  };
  kdark_color = {
    color: Palet.Kdark,
  };
  accent_background = {
    background: Palet.accent,
  };
  kdark_background = {
    background: Palet.Kdark,
  };
  input = {
    border: "none",
    padding: "8px",
    borderRadius: "3px",
    boxShadow: "inset 2px 2px 3px " + Palet.Kdark,
    outline: "none",
    margin: "5px 0px",
    width: "250px",
  };
  accent_button = {
    border: "none",
    color: Palet.Kdark50,
    background: Palet.accent,
    padding: "8px 15px",
    borderRadius: "5px",
    fontWeight: "500",
    cursor: "pointer",
  };
  normal_button = {
    outline: "1px solid " + Palet.accent,
    color: Palet.accent,
    background: Palet.Kdark50,
    padding: "8px 15px",
    borderRadius: "5px",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
  };
  hoverAccentButton(e) {
    e.target.style.background = Palet.Kdark50;
    e.target.style.color = Palet.accent;
    e.target.style.outline = "1px solid " + Palet.accent;
  }
  hoverNormalButton(e) {
    e.target.style.background = Palet.accent;
    e.target.style.color = Palet.Kdark50;
    e.target.style.outline = "none";
  }
  novalidation = {
    width: "0px",
    transition: ".6s",
    color: "red",
    background: "#fff",
    padding: "0px",
    position: "absolute",
    left: "20px",
    top: "9vh",
    borderRadius: "5px",
    height: "20px",
    overflow: "hidden",
  };
  validation(error) {
    return {
      overflow: "hidden",
      transition: ".6s",
      color: error ? "red" : "green",
      background: "#fff",
      padding: "10px",
      position: "absolute",
      zindex: "999",
      left: "20px",
      top: "9vh",
      borderRadius: "5px",
      height: "20px",
      width: "400px",
      display: "flex",
      gap: "10px",
      boxShadow: "3px 3px 5px " + Palet.Kdark,
    };
  }
  clear_button = {
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    fontSize: "20px",
    border: "solid #fff 1px",
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "none",
    padding: "0px",
  };
  link = {
    color: Palet.accent,
    textDecoration: "none",
  };
}
export default new Theme();
