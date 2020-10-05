import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createEvent} from '../actions/activityActions';

class AddEvent extends Component {
    state = {
        email: '',
        environment: '',
        component: '',
        message: '',
        notification: '',
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            email: '',
            environment: '',
            component: '',
            message: '',
            data: '',
        });
        const addEventPayload = {
            email: this.state.email,
            environment: this.state.environment,
            component: this.state.component,
            message: this.state.message,
            data: {}
        };

        fetch(process.env.REACT_APP_CREATE_EVENT_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addEventPayload)
        })
            .then(response => response.json())
            .then(data => {
                this.props.createEvent(data);
                this.setState({
                    notification: 'Event created successfully!'
                });
            })
            .catch(error => {
                this.setState({
                    notification: 'Error occurred!'
                });
                console.log('Error: ', error);
            });
    };

    render() {
        return (
            <div className="row">
                <nav>
                    <div className="nav-wrapper">
                        <a className="brand-logo center">Create a new event</a>
                    </div>
                </nav>
                <p>{this.state.notification}</p>
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="tom@chefhero.com" id="email" type="text" className="validate"
                                   onChange={this.handleChange} value={this.state.email}/>
                            <label className="active" htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s6">
                            <input placeholder="production" id="environment" type="text" className="validate"
                                   onChange={this.handleChange} value={this.state.environment}/>
                            <label className="active" htmlFor="environment">Environment</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="orders" id="component" type="text" className="validate"
                                   onChange={this.handleChange} value={this.state.component}/>
                            <label className="active" htmlFor="component">Component</label>
                        </div>
                        <div className="input-field col s6">
                            <input placeholder="type your message here" id="message" type="text" className="validate"
                                   onChange={this.handleChange} value={this.state.message}/>
                            <label className="active" htmlFor="message">Message</label>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
                </form>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createEvent: (event) => {
            dispatch(createEvent(event));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
