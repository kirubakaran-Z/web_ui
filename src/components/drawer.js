import "./UI/Drawer.css";
import * as Icon from "react-bootstrap-icons";
import MenuIteam from "./menu";
import Role from "../config/userrole";
function Drawer(props) {
  const route = props.page;
  return (
    <div className="DrawerMain">
      <div className="roleOptions">
        <MenuIteam
          ActiveRoute={route}
          ThisRoute="/MainRoute"
          title="Home"
          Icon={Icon.HouseDoorFill}
          AcceptedRoles={[Role.SU, Role.admin, Role.norole, Role.user]}
          currentRole={props.UserRole}
          changeroute={props.changeMainRoute}
          drawer={props.updateDrawer}
        ></MenuIteam>
        <MenuIteam
          ActiveRoute={route}
          ThisRoute="/Users"
          title="Users"
          Icon={Icon.PersonFill}
          AcceptedRoles={[Role.SU, Role.admin]}
          currentRole={props.UserRole}
          changeroute={props.changeMainRoute}
          drawer={props.updateDrawer}
        ></MenuIteam>
        <MenuIteam
          ActiveRoute={route}
          ThisRoute="/MyBookings"
          title="My Bookings"
          Icon={Icon.CalendarFill}
          AcceptedRoles={[Role.norole, Role.user]}
          currentRole={props.UserRole}
          changeroute={props.changeMainRoute}
          drawer={props.updateDrawer}
        ></MenuIteam>
        <MenuIteam
          ActiveRoute={route}
          ThisRoute="/gallery"
          title="Gallery"
          Icon={Icon.CameraFill}
          AcceptedRoles={[Role.SU, Role.admin, Role.norole, Role.user]}
          currentRole={props.UserRole}
          changeroute={props.changeMainRoute}
          drawer={props.updateDrawer}
        ></MenuIteam>
        <MenuIteam
          ActiveRoute={route}
          ThisRoute="/feedback"
          title="Feedback"
          Icon={Icon.ChatDotsFill}
          AcceptedRoles={[Role.norole, Role.user]}
          currentRole={props.UserRole}
          changeroute={props.changeMainRoute}
          drawer={props.updateDrawer}
        ></MenuIteam>
        <MenuIteam
          ActiveRoute={route}
          ThisRoute="/contact"
          title="Contact Us"
          Icon={Icon.PostcardFill}
          AcceptedRoles={[Role.norole, Role.user]}
          currentRole={props.UserRole}
          changeroute={props.changeMainRoute}
          drawer={props.updateDrawer}
        ></MenuIteam>
      </div>
    </div>
  );
}
export default Drawer;
