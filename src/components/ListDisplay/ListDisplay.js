import React, {Component} from 'react';
import './listdisplay.css';
import axios from 'axios';
import Product from './Products/Product';
import {connect} from 'react-redux';

export class ListDisplay extends Component {
  deleteHandler = (id, e) => {
      const listTemp = this.props.list.filter(ele => 
          ele['id'] !== id
          
    )
    axios.delete(`http://localhost:3000/product_listings/${id}`).then((res) => {
      this.props.updateList(listTemp)
    });
  };

  //Update implement
  editHandler = (id, e) => {

  }

  render() {
    return (
      <div className="list_container">
        {this.props.list.map((ele) => (
          <Product
            key={ele['id']}
            id={ele['id']}
            title={ele['title']}
            price={ele['price']}
            description={ele['body_html']}
            deleteHandler={this.deleteHandler}
            editHandler = {this.editHandler}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateList: (listVal) => dispatch({ type: 'UPDATE_LIST' , listVal }),
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(ListDisplay);
