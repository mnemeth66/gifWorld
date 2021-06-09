import React, { Component } from "react";
import ReactDom from "react-dom";

import "./searchBar.css"

class SearchBar extends Component<{parentCallback: any},{searchString:string}> {
    
    state = {
        searchString: ""
    }

    handleSubmit(event:any) {
        event.preventDefault();
        if (this.state.searchString.trim()) {
            this.sendData();
            this.fetchGifs(this.state.searchString);
        } else {
            alert("Please write item");
        }
    }
    onInputChange(event:any) {
        // console.log(event.target.value);
        this.setState({searchString: event.target.value});
        // console.log(this.state.searchString);
        // this.sendData(event.target.value);
    }

    sendData = () => {
        let search = this.state.searchString
        this.props.parentCallback(this.state.searchString);
        console.log("sending" + search + "to searchResults");
    }

    async fetchGifs(query:string) {
        const url = "http://api.giphy.com/v1/gifs/search?q=" 
                + query 
                + "&api_key=dc6zaTOxFJmzC"
                + "&limit=1"
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

        // console.log(pagination);
        if (Array.isArray(data) && data.length > 0) {
            console.log(data[0]);
        }
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