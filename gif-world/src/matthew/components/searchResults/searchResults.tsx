import React, { Component } from "react";
import ReactDom from "react-dom";
import "./searchResults.css";
import {FetchResponse} from "../../../Interfaces";

class SearchResults extends Component<{dataFromParent: FetchResponse}, {}> {
    render () {
        const data = this.props.dataFromParent;
        if (data.length > 0) {
            console.log(data[0].url);
            return (
                <div>
                    <img src={data[0].images.fixed_height.url}/>
                </div>
            )
        } else {
            return (
                <p> This is going to be fun! </p>
            )
        }
    }
}

export default SearchResults;