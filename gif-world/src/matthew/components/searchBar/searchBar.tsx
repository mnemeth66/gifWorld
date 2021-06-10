import React, { Component } from "react";
import ReactDom from "react-dom";

import "./searchBar.css"

class SearchBar extends Component<{searchCallback: any},{searchString: string}> {
    
    state = {
        searchString: ""
    }

    async handleSubmit(event: any) {
        event.preventDefault();
        if (this.state.searchString.trim()) {
            const data = await this.fetchGifs(this.state.searchString);
            this.sendData(data);
        } else {
            alert("Please enter search term.");
        }
    }
    onInputChange(event: any) {
        this.setState({searchString: event.target.value});
    }

    sendData = (data: {}) => {
        this.props.searchCallback(data);
    }

    async fetchGifs(query:string) {
        const url = "http://api.giphy.com/v1/gifs/search?q=" 
                + query 
                + "&api_key=dc6zaTOxFJmzC"
                + "&limit=10"
        // Method 1
        const response = await fetch(url);
        const {data, pagination, meta} = await response.json();

        // Method 2
        // let data = {};
        // fetch(url).then(async response => {
        //     const JSONResponse = await response.json();
        //     data = JSONResponse.data
        //     console.log(data);
        // })
        return data
    }

    render() {
        return (
            <div className="searchBar">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input
                        className="input"
                        name = "searchString"
                        type = "text"
                        onChange={this.onInputChange.bind(this)}
                        placeholder="Input gif to search"
                        value={this.state.searchString}
                    ></input>
                    <input type="submit" value="Search GIF"/>
                </form>
                
            </div>
        );
    }
}

export default SearchBar;