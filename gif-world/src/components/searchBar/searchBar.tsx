import React, { Component } from "react";
import ReactDom from "react-dom";

import "./searchBar.css"

class SearchBar extends Component {
    state = {
        searchString: ""
    }
    onInputChange(event:any) {
        // this.state.searchString += event.target.value;
        console.log(this.state.searchString);
    }


    render() {
        return (
            <div className="searchBar">
                <input
                    name = "searchString"
                    type = "text"
                    onChange={this.onInputChange}
                    placeholder="Input gif to search"
                    value={this.state.searchString}
                ></input>
            </div>
        );
    }
}

export default SearchBar;