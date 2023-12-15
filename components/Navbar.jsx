import SearchContacts from "./contact/SearchContacts";
import { useLocation } from "react-router-dom";
import { CURRENTLINE, PURPLE, FOREGROUND, RED } from "../helper/colors";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav
      className="navbar navbar-dark navbar-expand-sm shadow-19"
      style={{ backgroundColor: CURRENTLINE }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div className="navbar-brand">
              <i className="fa fa-id-badge" style={{ color: PURPLE }} />{" "}
              Application Manegment <span style={{ color: RED }}>Content</span>
            </div>
          </div>
          {location.pathname === "/contacts" ? <SearchContacts /> : null}
        </div>
      </div>
      <hr style={{ backgroundColor: FOREGROUND }} />
    </nav>
  );
};
export default Navbar;
