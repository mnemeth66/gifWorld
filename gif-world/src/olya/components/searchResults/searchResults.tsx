import React, { Component } from "react";
import ReactDom from "react-dom";
import "./searchResults.css";

class SearchResults extends Component<{dataFromParent: string}, {}> {
    state = {
        dataFromParent: "",
        isLoaded: false,
        items: []
    }

    componentDidMount() {
        fetch("http://api.giphy.com/v1/gifs/trending?gif-world&api_key=v39kGDxRW44cU2PinH70vVVl764cftGM&limit=20")
        .then(res => res.json())
        .then(result => {
            this.setState({
                dataFromParent: "",
                isLoaded: true,
                items: result.data
            });
            console.log(result)
        });
    }
    render () {
        const { dataFromParent, isLoaded, items } = this.state;
        if (dataFromParent.length > 0) {
            return (
                <div className="searchResults">
                    Data from parent is: {this.props.dataFromParent}
                </div>
            )
        } else {
            if (this.state.isLoaded) {
                return (
                    <div className="searchResults">
                        {items.map((item:any) => (
                            <div key={item.id}>
                                <img src={item.images.fixed_width.url} className="image"></img>
                            </div>
                        ))}
                    </div>
                )
            } else {
                return (
                    <div>I am loading</div>
                )
            }
            
        }
    }
}

export default SearchResults;