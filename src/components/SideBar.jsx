import './main.css'
import { Row, Col } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
const SideBar = () => {
  return (
    <Col md={2} className="side-bar">
      <Link to="/">
        <img
          src="../../images/logo.png"
          style={{
            width: "65%",
            marginLeft: "30px",
            marginTop: "20px"
          }}
          alt=""
        />
      </Link>
      <ul className="adminsidebar"
        style={{ marginTop: "80px" }}>
        <li>
          <NavLink to="/home">
            <div className="navlink-container">
              <p style={{ marginLeft: "30px" }}>Home Page</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/productmanagement">
            <div className="navlink-container">
              <p style={{ marginLeft: "30px" }}>Products</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/adminusers">
            <div className="navlink-container">
              <p style={{ marginLeft: "30px" }}>Users</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/adminorders">
            <div className="navlink-container">
              <p style={{ marginLeft: "30px" }}>Orders</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics">
            <div className="navlink-container">
              <p style={{ marginLeft: "30px" }}>Statistics</p>
            </div>
          </NavLink>
        </li>
      </ul >
    </Col >
  );
};
export default SideBar;
