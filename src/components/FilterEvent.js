import React, {Component} from 'react';
import {connect} from 'react-redux';
import {filterEvent} from '../actions/activityActions';

class FilterEvent extends Component {
    state = {
        email: '',
        environment: '',
        component: '',
        message: '',
        createdAt: '',
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
            createdAt: '',
        });
        const filterEventPayload = {
            email: this.state.email,
            environment: this.state.environment,
            component: this.state.component,
            message: this.state.message,
            createdAt: this.state.createdAt,
        };

        fetch(process.env.REACT_APP_SEARCH_EVENT_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filterEventPayload)
        })
            .then(response => response.json())
            .then(events => {
                this.props.filterEvent(events);
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
                        <a className="brand-logo center">Filter existing events</a>
                    </div>
                </nav>
                <p>{this.state.notification}</p>
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s4">
                            <input placeholder="tom@chefhero.com" id="email" type="text" className="validate"
                                   onChange={this.handleChange} value={this.state.email}/>
                            <label className="active" htmlFor="email">Search by email</label>
                        </div>
                        <div className="input-field col s4">
                            <input placeholder="production" id="environment" type="text" className="validate"
                                   onChange={this.handleChange} value={this.state.environment}/>
                            <label className="active" htmlFor="environment">Search by environment</label>
                        </div>
                        <div className="input-field col s4">
                            <input placeholder="orders" id="component" type="text" className="validate"
                                   onChange={this.handleChange} value={this.state.component}/>
                            <label className="active" htmlFor="component">Search by component</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="2020-10-3" id="createdAt" type="text" className="validate"
                                   onChange={this.handleChange} value={this.state.createdAt}/>
                            <label className="active" htmlFor="createdAt">Search by created date</label>
                        </div>
                        <div className="input-field col s6">
                            <input placeholder="type the text included in message" id="message" type="text"
                                   className="validate"
                                   onChange={this.handleChange} value={this.state.message}/>
                            <label className="active" htmlFor="message">Search by message included text</label>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" name="action">Search</button>
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
        filterEvent: (events) => {
            dispatch(filterEvent(events));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterEvent);
