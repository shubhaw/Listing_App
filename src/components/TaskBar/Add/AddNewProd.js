import React from 'react';
import './addnewprod.css';
import axios from 'axios';
import { useRef } from 'react';
import { connect } from 'react-redux';


// TODO: Title not coming, check vendor getting set. Prod id taken 2 when on page 2 and adding new prod.
const AddNewProd = (props) => {
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const vendorRef = useRef(null);
    const priceRef = useRef(null);
    const imageRef = useRef(null);
    function submitHandler(e) {
        e.preventDefault();
    }
    function clearHandler() {
        titleRef.current.value = '';
        descriptionRef.current.value = '';
        vendorRef.current.value = '';
        priceRef.current.value = '';
        imageRef.current.value = '';
    }

    function saveHandler() {
        const updatedList = props.list;
        const newItem = {
            id: 16,
            body_html: descriptionRef.current.value,
            title: imageRef.current.value,
            vendor: vendorRef.current.value,
            images: imageRef.current.value,
            price: priceRef.current.value,
        };
        updatedList.push(newItem);

        axios
            .post('http://localhost:3000/product_listings', newItem)
            .then((response) => {
                console.log(response)
                props.updateList(updatedList);
                props.history.push('/');
            });
    }

    function cancelHandler() {
        props.history.push('/');
    }
    return (
        <form onSubmit={submitHandler} className="form_container">
            <div className="form_row">
                <label htmlFor="product_id">Product Id:</label>
                <input type="product_id" id="id" name="id" value={props.list.length + 1} disabled />
            </div>
            <div className="form_row">
                <label htmlFor="product_name">Product Name:</label>
                <input
                    ref={titleRef}
                    type="product_name"
                    id="title"
                    name="title"
                    placeholder="Enter Product Name"
                />
            </div>
            <div className="form_row">
                <label htmlFor="description">Description:</label>
                <input
                    ref={descriptionRef}
                    type="description"
                    id="body_html"
                    name="body_html"
                    placeholder="Enter Product Description"
                />
            </div>
            <div className="form_row">
                <label htmlFor="vendor">Vendor:</label>
                <input
                    type="vendor"
                    ref={vendorRef}
                    id="vendor"
                    name="vendor"
                    placeholder="Enter Vendor Name"
                />
            </div>
            <div className="form_row">
                <label htmlFor="price">Price:</label>
                <input
                    ref={priceRef}
                    type="price"
                    id="price"
                    name="price"
                    placeholder="Enter Product Price"
                />
            </div>
            <div className="form_row">
                <label htmlFor="images">Image:</label>
                <input
                    ref={imageRef}
                    name="images"
                    type="images"
                    id="primagesice"
                    placeholder="URL for Product Image"
                />
            </div>
            <div className="form_row">
                <button name="clearAll" className="clearBtn" onClick={clearHandler}>Clear All</button>
                <button name="save" className="saveBtn" onClick={saveHandler}>Add</button>
                <button name="cancel" className="cancelBtn" onClick={cancelHandler}>Cancel</button>
            </div>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        list: state.list,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateList: (listVal) => dispatch({ type: 'UPDATE_LIST', listVal }),
    };
};

const wrappedComp = connect(mapStateToProps, mapDispatchToProps)(AddNewProd);
export default wrappedComp;
