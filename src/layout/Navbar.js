import React from 'react'
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const  Navbar = (props) => {
  
  return (
  
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3 p-3">
      <a href="/" className="navbar-brand">{props.title}</a>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <a href = "/" className = "nav-link">Anasayfa</a>
        </li>
        <li className="nav-item active">
          <a href = "/add" className = "nav-link">Kitap Ekle</a>
       </li>
     
      
      </ul>
      </div>
    
    </nav>
    
  )
}

Navbar.propTypes = {
  title : PropTypes.string.isRequired
}

Navbar.defaultProps = {
  title : "Kütüphane"
}

export default Navbar;
