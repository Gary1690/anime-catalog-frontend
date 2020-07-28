import React from 'react';
import Signup from './Signup';
import Login from './Login';

class Auth extends React.Component {
    state = {
        isNewUser: false,
    }

    toggleNewUser = () => this.setState(prevState => ({ isNewUser: !prevState.isNewUser }))

    render() {
        return(
            <>
                {this.state.isNewUser? <Signup handleUser={this.props.handleUser} history={this.props.history} toggleNewUser={this.toggleNewUser}/> : <Login handleUser={this.props.handleUser} history={this.props.history} toggleNewUser={this.toggleNewUser}/>}
            </>
        )
    }

}

export default Auth