import React from "react";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            isBadCredentials: false,
            isLoading: false,
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitRegister = () => {
        this.setState({isBadCredentials: false, isLoading: true})
        fetch('https://smartbrain-backend-bsst.onrender.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.setState({isLoading: false})
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
                else {
                    this.setState({isLoading: false, isBadCredentials: true})
                }
            })
            .catch(console.log)
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.onSubmitRegister()
        }
    }

    render() {
        return(
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input onKeyDown={this.handleKeyDown} 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" name="name"  id="name" 
                                onChange={this.onNameChange} />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onKeyDown={this.handleKeyDown} 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" name="email-address"  id="email-address" 
                                onChange={this.onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onKeyDown={this.handleKeyDown} 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" name="password"  id="password" 
                                onChange={this.onPasswordChange} />
                            </div>
                        </fieldset>
                        { this.state.isBadCredentials 
                            ? 
                            <div>
                                <p className="dark-red f4 b">
                                    Bad Credentials! No blank spaces and email must not be currently registered!
                                </p>
                            </div> 
                            : this.state.isLoading
                            ?
                            <div>
                                <p className="f4 b">Please wait...</p>
                              </div>
                            : 
                              <div>
                              </div>
                        }
                        <div className="">
                            <input onClick={this.onSubmitRegister}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Register;