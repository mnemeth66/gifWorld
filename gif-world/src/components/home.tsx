import React from "react";
import ReactDom from "react-dom";
import Header from "./header/header";
import SearchBar from "./searchBar/searchBar";

const Home = () => {
    return (
        <div>
            <Header></Header>
            <SearchBar />
        </div>
    );
}

export default Home;