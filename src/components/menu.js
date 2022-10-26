import Theme from "../config/theme";
import Palet from "../config/color";
import "./UI/menu.css";

function MenuIteam(props) {
  const active = {
    color: "#fff",
    background: Palet.accent,
  };
  const Icon = props.Icon;
  if (props.AcceptedRoles.includes(props.currentRole)) {
    return (
      <span
        onClick={() => {
          props.changeroute(props.ThisRoute);
          props.drawer();
        }}
        className="Options"
        style={
          props.ActiveRoute === props.ThisRoute ? active : Theme.accent_color
        }
      >
        <Icon></Icon>
        {props.title}
      </span>
    );
  }
}
export default MenuIteam;
