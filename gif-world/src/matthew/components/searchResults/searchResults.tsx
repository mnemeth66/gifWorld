import React, { Component } from "react";
import ReactDom from "react-dom";
import "./searchResults.css";

class SearchResults extends Component<{dataFromParent: string}, {}> {
    render () {
        return (
            <div>
                Data from parent: {this.props.dataFromParent}
            </div>
        )
    }
}

export default SearchResults;