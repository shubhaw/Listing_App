import React, { Component } from 'react';
import './listdisplay.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { List } from './List';
import Taskbar from '../TaskBar/Taskbar';
import { Pagination } from '../Pagination/Pagination';

export class ListDisplay extends Component {
    deleteHandler = (id, e) => {
        const listTemp = this.props.list.filter(ele =>
            ele['id'] !== id

        )
        axios.delete(`http://localhost:3000/product_listings/${id}`).then((res) => {
            this.props.updateList(listTemp)
        });
    };

    // TODO: Update implement
    editHandler = (id, e) => {

    }

    render() {
        return <>
            <Taskbar />
            <List />
            <Pagination totalPages={10} />
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.list,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateList: (listVal) => dispatch({ type: 'UPDATE_LIST', listVal }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDisplay);
