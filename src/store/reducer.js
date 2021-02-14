const initialstate = {
    list: [],
    searchValue: "",
    currentPage: 1,
}


const reducer = (state = initialstate, action) => {
    switch (action.type) {
        case 'UPDATE_LIST':
            {
                const newList = action.listVal
                return {
                    ...state,
                    list: newList
                }
            }
        case 'UPDATE_CURRENT_PAGE':
            {
                const updatedCurrentPage = action.updatetype === 'increament' ? state.currentPage + 1 : state.currentPage - 1

                return {
                    ...state,
                    currentPage: updatedCurrentPage
                }
            }

        case 'UPDATE_SEARCH_VALUE':
            {
                const updatedSearchValue = action.searchVal.length ? action.searchVal : ""
                return {
                    ...state,
                    searchValue: updatedSearchValue
                }
            }


        default: return state;
    }


};

export default reducer;