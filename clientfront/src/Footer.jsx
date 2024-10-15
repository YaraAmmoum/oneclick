import "./assets/styles/style.css";
import facebook from "./assets/image/facebook.png";
import instagram from "./assets/image/instagram.png";
import linkedin from "./assets/image/linkedin.png";
import x from "./assets/image/x.png";
import { Link } from "react-router-dom";
// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return (
    <footer className="footer">
      <div className="shopFooter">
        Shop
        <div className="WMHS">
          <Link to="/buy">
            <li className="liFooter">Women</li>
          </Link>
          <Link to="/buy">
            <li className="liFooter">Men</li>
          </Link>
          <Link to="/buy">
            <li className="liFooter">Home</li>
          </Link>
          <Link to="/buy">
            <li className="liFooter lastLiFooter">Sport</li>
          </Link>
        </div>
      </div>
      <div className="helpFooter">
        Help
        <div className="WMHS">
      
          <Link to="/about">
            <li className="liFooter">About Us</li>
          </Link>
         
        </div>
      </div>
      <div className="logoFooter">
        <div className="logoIcon">
          <Link to ="http://www.facebook.com/"><img src={facebook} alt="facebook" /></Link>
          <Link to ="http://www.instagram.com/"><img src={instagram} alt="instagram" /></Link>
          <Link to ="http://www.linkedin.com/"><img src={linkedin} alt="linkedIn" /></Link>
          <Link to ="http://www.x.com/"><img src={x} alt="x" /></Link>
        </div>
      </div>
    </footer>
  );
}
