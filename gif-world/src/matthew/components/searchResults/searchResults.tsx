import { Component } from "react";
import "./searchResults.css";
import {FetchResponse} from "../../../Interfaces";

class SearchResults extends Component<{dataFromParent: FetchResponse}, {}> {
    state = {
        idx: 0,
    }
    render () {
        const data = this.props.dataFromParent;
        if (data.length > 0) {
            const max_idx = data.length;
            const mod = (a: number, b: number) => {
                return ((a % b) + b) % b;
            }
            const left = () => {
                this.setState({idx: mod((this.state.idx - 1), max_idx)});
            }
            const right = () => {
                this.setState({idx: mod((this.state.idx + 1), max_idx)})
            }
            return (
                <div className="GIF-box">
                    <button className="delete-GIF-button">X</button>
                    <img className="image" src={data[this.state.idx].images.fixed_height.url} alt="gif"/>
                    <button className="left-button" onClick={left}>&lt; -</button>
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