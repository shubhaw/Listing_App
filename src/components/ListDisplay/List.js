import React from "react";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Products/Product";
import './listdisplay.css';
import { useHistory, useLocation } from "react-router-dom";

export const List = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState("");
    const list = useSelector(state => state.list);
    const currentPage = useSelector(state => state.currentPage);
    const searchText = useSelector(state => state.searchValue);
    const dispatch = useDispatch();

    const history = useHistory();
    const location = useLocation();

    React.useEffect(() => {
        const fetchList = async (pageNumber, searchString) => {
            setIsLoading(true);
            setApiError("");
            let list;
            try {
                list = await (await axios.get(`product_listings?q=${searchString}&_page=${pageNumber}`)).data;
            } catch (err) {
                setApiError(err);
            }
            setIsLoading(false);
            dispatch({ type: 'UPDATE_LIST', listVal: list });
        };

        const searchParams = new URLSearchParams(location.search);
        const pageNumberFromParam = +searchParams.get("_page");
        const searchTextFromParam = searchParams.get("q") || "";
        if (currentPage !== pageNumberFromParam) {
            if (pageNumberFromParam === null || pageNumberFromParam === 0) {
                history.replace({
                    pathname: "/",
                    search: `?_page=${currentPage}`
                })
            } else {
                dispatch({ type: 'UPDATE_CURRENT_PAGE', pageNumber: pageNumberFromParam });
            }
        }

        if (searchText !== searchTextFromParam) {
            dispatch({ type: 'UPDATE_SEARCH_VALUE', searchVal: searchTextFromParam });
        }

        fetchList(currentPage, searchText);
    }, [currentPage, searchText, history, location, dispatch]);

    return <div className="list_container">
        {!!apiError && apiError}
        {isLoading && "Loading"}
        {!isLoading && list && list.length === 0 && "No Products!"}
        {list && list.length > 0 && list.map((ele) => (
            <Product
                key={ele['id']}
                id={ele['id']}
                title={ele['title']}
                price={ele['price']}
                description={ele['body_html']}
            // deleteHandler={this.deleteHandler}
            // editHandler = {this.editHandler}
            />
        ))}
    </div>
}