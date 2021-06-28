import { Component } from "react";
import "./searchResults.css";
import { SearchTermWithFetch } from "../../../Interfaces";

class SearchResults extends Component<{dataFromParent: SearchTermWithFetch}, {}> {
    state = {
        idx: 0,
    }
    render () {
        const searchTerm = this.props.dataFromParent.searchTerm;
        const data = this.props.dataFromParent.fetch;
        console.log("DATA:__", data)
        if (data && data.length > 0) {
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
            const saveGif = async () => {
                for (let i = 0; i < max_idx; i++) {
                    await fetch("https://65s902eyzd.execute-api.us-east-1.amazonaws.com/savedGifs/update", {
                        method: 'PUT',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            'searchTerm': searchTerm,
                            'id': i,
                            'URL': data[i].images.fixed_height.url
                        })
                    });
                    console.log('submitted: ', i)
                }
            }
            return (
                <div className="GIF-box">
                    <button className="delete-GIF-button">X</button>
                    <button className="save-GIF-button" onClick={saveGif}>Save</button>
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