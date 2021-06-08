import React, { Component } from "react";
import ReactDom from "react-dom";
import "./searchResults.css";

class SearchResults extends Component<{dataFromParent: string}> {
    state = {
        dataFromParent: ""
    }
    render () {
        return (
            <div className="searchResults">
                Data from parent is: {this.props.dataFromParent}
            </div>
        )
    }
}

export default SearchResults;