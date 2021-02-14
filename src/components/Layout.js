import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import './layout.css';
import SearchBar from './TopBar/SearchBar';
import ecom_logo from './../ecom_logo.jpg';
import Taskbar from './TaskBar/Taskbar';
import ListDisplay from './ListDisplay/ListDisplay';

export class Layout extends Component {

    state = {
        pages: []
    }

    componentDidMount() {
        this.calculatePages();
        axios.get(`http://localhost:3000/product_listings?_page=1`).then((res) => {
            this.props.updateList(res.data)
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.searchValue === "" && this.props.currentPage !== prevProps.currentPage) {
            axios
                .get(`http://localhost:3000/product_listings?_page=${this.props.currentPage}`)
                .then((res) => {
                    this.props.updateList(res.data)
                });
            this.calculatePages();
        }
        if (this.props.searchValue !== prevProps.searchValue) {
            axios
                .get(`http://localhost:3000/product_listings?q=${this.props.searchValue}&_page=1`)
                .then((res) => {
                    this.props.updateList(res.data)
                })
        } else if (this.props.currentPage !== prevProps.currentPage) {
            axios
                .get(`http://localhost:3000/product_listings?q=${this.props.searchValue}&_page=${this.props.currentPage}`)
                .then((res) => {
                    this.props.updateList(res.data)
                });
            this.calculatePages();
        }
    }

    calculatePages = () => {
        const pages = [];
        let i = 0;
        const currentPage = this.props.currentPage - 5;
        while (i < 10) {
            let pageNumber = currentPage + ++i;
            pageNumber > 0 && pages.push(pageNumber);
        }
        this.setState({ pages });
    }

    //debounce this function or add serach icon button
    onChange = (value) => {
        this.props.updateSearchValue(value)
    }

    render() {
        if (this.props.currentPage > 1) {
            var prevButtons = <button onClick={() => this.props.updateCurrentPage('decrement')}> Prev </button>;
        }

        //check condition here - it should be dynamically calculated limit
        if (this.props.currentPage < 49) {
            var nextButtons = <button onClick={() => this.props.updateCurrentPage('increament')}> Next </button>;
        }
        return (
            <div>
                <div className="layout_container">
                    <div className="top_bar">
                        <img src={ecom_logo} alt="Logo" height="70px" width="70px" />
                        <SearchBar onChange={this.onChange} />
                        <span> More </span>
                    </div>
                    <div className="taskbar">
                        <Taskbar />
                    </div>
                    <div className="listDisplay">
                        <ListDisplay />
                    </div>
                    <div className="footer">
                        <div className="page_info">Page {this.props.currentPage} of 50</div>
                        <div className="nav_buttons">
                            {prevButtons}
                            {this.state.pages.map(pNo => {
                                const classes = "pageNumber " + (this.props.currentPage === pNo ? "selectedPageNumber" : "");
                                return <span className={classes} key={pNo}>{pNo}</span>
                            })}
                            {nextButtons}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        list: state.list,
        currentPage: state.currentPage,
        searchValue: state.searchValue
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateList: (listVal) => dispatch({ type: 'UPDATE_LIST', listVal }),
        updateSearchValue: (searchVal) => dispatch({ type: 'UPDATE_SEARCH_VALUE', searchVal }),
        updateCurrentPage: (updatetype) => dispatch({ type: 'UPDATE_CURRENT_PAGE', updatetype })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
