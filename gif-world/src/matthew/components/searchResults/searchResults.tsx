import React, { Component } from "react";
import ReactDom from "react-dom";
import "./searchResults.css";
import {FetchResponse} from "../../../Interfaces";

class SearchResults extends Component<{dataFromParent: FetchResponse}, {}> {
    state = {
        idx: 0,
    }
    render () {
        const data = this.props.dataFromParent;
        if (data.length > 0) {
            console.log(data.length);
            const max_idx = data.length;
            const mod = (a: number, b: number) => {
                return ((a % b) + b) % b;
            }
            const left = () => {
                console.log(mod((this.state.idx - 1), max_idx));
                this.setState({idx: mod((this.state.idx - 1), max_idx)});
            }
            const right = () => {
                this.setState({idx: mod((this.state.idx + 1), max_idx)})
            }
            return (
                <div>
                    <button className="left-button" onClick={left}>&lt; -</button>
                    <img src={data[this.state.idx].images.fixed_height.url}/>
                    <button className="right-button" onClick={right}>- &gt;</button>
                </div>
            )
        } else {
            return (
                <p> No GIFS :( </p>
            )
        }
    }
}

export default SearchResults;