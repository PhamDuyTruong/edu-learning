import React from "react";
import "../../Styles/footer.css"

const Footer = ({isTheme}) => {
  return (
    <footer className="container-fluid pt-5" style={{background: `linear-gradient(90deg, #0099ff 50%, ${isTheme ? "#9e9e9e 50%" : "white 50%"})`}}>
      <div className="footer_container">
        <div className="footer_content mb-4">
          <div className="row">
            <div className="col-sm-3">
              <ul className="link">
                <li>
                  <a href="#" className="item-special">
                    E-learn for Business
                  </a>
                </li>
                <li>
                  <a href="#" className="item-special">
                    Teach on E-learning
                  </a>
                </li>
                <li>
                  <a href="#" className="item-special">E-learning app</a>
                </li>
                <li>
                  <a href="#" className="item-special">About us</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3">
              <ul className="link item-special">
                <li>
                  <a href="#" className="item-special">Contact Us</a>
                </li>
                <li>
                  <a href="#" className="item-special">Careers</a>
                </li>
                <li>
                  <a href="#" className="item-special">Blog</a>
                </li>
                <li>
                  <a href="#" className="item-special">Help and Support</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3">
              <ul className="link">
                <li>
                  <a href="#" style={{color: `${isTheme ? "white": "#007791"}`}}>Affiliate</a>
                </li>
                <li>
                  <a href="#" style={{color: `${isTheme ? "white": "#007791"}`}}>Sitemap</a>
                </li>
                <li>
                  <a href="#" style={{color: `${isTheme ? "white": "#007791"}`}}>Features Courses</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-3">
              <div className="dropdown">
                <a
                  className="btn btn-light dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-globe-americas" />
                  <span>English</span>
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <a className="dropdown-item" href="#">
                    English
                  </a>
                  <a className="dropdown-item" href="#">
                    Deutsh
                  </a>
                  <a className="dropdown-item" href="#">
                    Español
                  </a>
                  <a className="dropdown-item" href="#">
                    Français
                  </a>
                  <a className="dropdown-item" href="#">
                    Italiano
                  </a>
                  <a className="dropdown-item" href="#">
                    日本語
                  </a>
                  <a className="dropdown-item" href="#">
                    한국어
                  </a>
                  <a className="dropdown-item" href="#">
                    Nederlands
                  </a>
                  <a className="dropdown-item" href="#">
                    Polski
                  </a>
                  <a className="dropdown-item" href="#">
                    Português
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className="footer_copy">
          <div className="footer_logo">
            <span>Copyright © 2022 E-learning, Inc</span>
          </div>
          <div className="footer_logo">
            <a href="#" style={{textDecoration:"none", fontWeight:"700"}}>Privacy policy and cookies policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
