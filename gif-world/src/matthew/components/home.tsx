import React, { Component } from "react";
import Header from "./header/header";
import SearchBar from "./searchBar/searchBar";
import SearchResults from "./searchResults/searchResults";

import { SearchTermWithFetch } from "../../Interfaces";


class Home extends Component<{}, {searchCallback: SearchTermWithFetch}> {
    state = {
        searchCallback: {
            searchTerm: "",
            fetch: []
        },
    }

    callbackFunction = (childData: SearchTermWithFetch) => {
        this.setState({searchCallback: childData})     
    }

    render() {
        return (
            <div>
                <Header />
                <SearchBar searchCallback = {this.callbackFunction}/>
                <SearchResults dataFromParent = {this.state.searchCallback} />
                <SearchResults dataFromParent = {this.state.searchCallback} />
            </div>
        );
    }
    
}

export default Home;