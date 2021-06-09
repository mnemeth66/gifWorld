import React, { Component } from "react";
import ReactDom from "react-dom";

import "./searchBar.css"

class SearchBar extends Component<{parentCallback: any},{searchString:string}> {
    
    state = {
        searchString: ""
    }

    onInputChange(event:any) {
        // console.log(event.target.value);
        this.setState({searchString: event.target.value});
        // console.log(this.state.searchString);
        // this.sendData(event.target.value);
    }

    sendData = () => {
        this.props.parentCallback(this.state.searchString);
    }

    render() {
        return (
            <div className="searchBar">
                <input
                    className="input"
                    name = "searchString"
                    type = "text"
                    onChange={this.onInputChange.bind(this)}
                    placeholder="Input gif to search"
                    value={this.state.searchString}
                ></input>
            </div>
        );
    }
}

export default SearchBar;