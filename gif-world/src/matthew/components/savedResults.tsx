import { Component } from "react";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react"
import { AuthStateHandler, CognitoUserInterface } from "@aws-amplify/ui-components"
import { SearchTermWithFetch } from "../../Interfaces";
import SearchResults from "./searchResults/searchResults"

interface QueryItem {
    id: number,
    searchTerm: string,
    URL: string,
}
interface QueryResponse {
    Items: QueryItem[]
}
interface StringIndexable {
    [index: string]: {images: {fixed_height: {url: string}}}[]
}
class savedResults extends Component<{}, {saved: string, userToken: {}, links: SearchTermWithFetch[]}> {
    state = {
        saved: "",
        userToken: {}, 
        links: [],
    }
    componentDidMount() {
        this.getSecretMessage();
    }
    async getSecretMessage() {
        try {
            // console.log(`Bearer ${this.state.userToken}`);
            const response = await fetch("https://65s902eyzd.execute-api.us-east-1.amazonaws.com/secret_hideout", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.state.userToken}`
                },
                redirect: 'follow',
            });
            console.log(response)
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                this.setState({ saved: JSON.stringify(data) });
            } else {
                this.setState({ saved: "You're not authorized to see this message."});
            }
        } catch (e) {
            this.setState({ saved: "random other error lol: " + e});
        }
    }
    changeFormat(data: QueryResponse): SearchTermWithFetch[] {
        let links_obj = data.Items.reduce((r: StringIndexable, a) => {
            let newItem = {images: {fixed_height: {url: a.URL}}}
            r[a.searchTerm] = [...r[a.searchTerm] || [], newItem];
            return r
          }, {});
        let links_arr: SearchTermWithFetch[] = []
        for (let term in links_obj) {
        links_arr.push({
            searchTerm: term, 
            fetch: links_obj[term]}
            )
        }
        return links_arr
    }
    async getSavedGifs() {
        try {
            const response = await fetch(
                "https://65s902eyzd.execute-api.us-east-1.amazonaws.com/savedGifs/scan"
                + "?q="
                + `searchTerms=""`);
            const data: QueryResponse = await response.json();
            console.log(data)
            const newData = this.changeFormat(data)
            console.log("New format: ", newData)
            this.setState({links: newData})
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    render() {
        const handleAuthStateChange: AuthStateHandler | undefined = ((nextAuthState: any, authData: CognitoUserInterface | object | undefined) => {
            // console.log(authData);
            if (authData && 'signInUserSession' in authData) {
                this.setState({ userToken: authData.signInUserSession.accessToken.jwtToken })
            } else {
                this.setState({ userToken: {} })
            }
            this.getSecretMessage();
            this.getSavedGifs();

        });
        return (
            <>
                <AmplifyAuthenticator handleAuthStateChange={handleAuthStateChange}/>
                <AmplifySignOut style={{position: 'fixed', bottom: '0px'}}/>
                <div style={{position: 'fixed', top: '15px', marginLeft: '25%',
                            marginRight: '25%', border: '3px solid green', width: '40%'
                            }}>
                    <h1 style={{ textAlign: 'center'}}> {this.state.saved} </h1>
                </div>
                <div>
                    {this.state.links.map(links => <SearchResults dataFromParent={links}/>)}
                </div>

                
            </>
        );
    }
}

export default savedResults