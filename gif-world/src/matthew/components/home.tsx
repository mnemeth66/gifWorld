import React, { Component } from "react";
import Header from "./header/header";
import SearchBar from "./searchBar/searchBar";
import SearchResults from "./searchResults/searchResults";

import {FetchResponse} from "../../Interfaces";


class Home extends Component<{}, {searchCallback: FetchResponse}> {
    state = {
        searchCallback: [],
    }

    callbackFunction = (childData: FetchResponse) => {
        this.setState({searchCallback: childData})     
    }

    render() {
        return (
            <div>
                <Header />
                <SearchBar searchCallback = {this.callbackFunction}/>
                <SearchResults dataFromParent = {this.state.searchCallback} />
            </div>
        );
    }
    
}

export default Home;