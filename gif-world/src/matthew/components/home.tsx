import React, { Component } from "react";
import ReactDom from "react-dom";
import Header from "./header/header";
import SearchBar from "./searchBar/searchBar";
import SearchResults from "./searchResults/searchResults";


class Home extends Component<{}, {parentCallback: string}> {
    state = {
        parentCallback: ""
    }

    callbackFunction = (childData:string) => {
        this.setState({parentCallback: childData})     
    }

    render() {
        return (
            <div>
                <Header />
                <SearchBar parentCallback = {this.callbackFunction}/>
                <SearchResults dataFromParent = {this.state.parentCallback} />
            </div>
        );
    }
    
}

export default Home;