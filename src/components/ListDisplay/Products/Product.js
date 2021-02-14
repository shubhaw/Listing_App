import React from 'react';
import './Product.css';
import logo from './../../../logo.svg';
import edit from './../../../edit.png';
import del from './../../../delete.png';

const Product = (props) => {
 

  return (
    <div className="product_container">
      <div>
        <img src={logo} alt="Logo" height="100px" width="100px" />
      </div>
      <div className="product_details">
        <a href="/"> {props.title} </a>
        <span> {props.description} </span>
      </div>
      <div className="last_column">
        <span> {props.price} </span>
        <div className="update_del_button_container">
          <button>
            <img
              src={edit}
              height="20px"
              width="20px"
              alt="Edit Icon"
              onClick={(e) => props.editHandler(props.id, e)}
            />
          </button>
          <button>
            <img
              src={del}
              height="15px"
              width="25px"
              alt="Delete Icon"
              onClick={(e) => props.deleteHandler(props.id, e)}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
