import { Component } from "react";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react"
import { AuthStateHandler, CognitoUserInterface } from "@aws-amplify/ui-components"

class savedResults extends Component<{}, {}> {
    state = {
        saved: "",
        userToken: {},
    }
    componentDidMount() {
        console.log('component mount')
        this.getSaved();
    }
    async getSaved() {
        try {
            const response = await fetch("https://65s902eyzd.execute-api.us-east-1.amazonaws.com/secret_hideout", {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': `Bearer ${this.state.userToken}`
                },
            });
            console.log(response)
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                this.setState({ saved: JSON.stringify(data) });
            } else {
                this.setState({ saved: "Error: " + response.status + ". \n You're not authorized to see this message."});
            }
        } catch (e) {
            this.setState({ saved: "random other error lol" });
        }
    }

    render() {
        const handleAuthStateChange: AuthStateHandler | undefined = ((nextAuthState: any, authData: CognitoUserInterface | object | undefined) => {
            console.log(authData);
            if (authData && 'signInUserSession' in authData) {
                this.setState({ userToken: authData.signInUserSession.accessToken.jwtToken })
            } else {
                this.setState({ userToken: {} })
            }
            this.getSaved();
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

                
            </>
        );
    }
}

export default savedResults