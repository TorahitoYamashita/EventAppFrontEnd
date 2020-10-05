import React, {Component} from 'react';
import AddEvent from './AddEvent';
import FilterEvent from './FilterEvent';
import Events from './Events';
import {fetchInitialEvents} from "../actions/activityActions";
import {connect} from "react-redux";

class App extends Component {
    state = {
        notification: '',
    };

    componentDidMount() {
        fetch(process.env.REACT_APP_SEARCH_EVENT_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(events => {
                this.props.fetchInitialEvents(events);
            })
            .catch(error => {
                this.setState({
                    notification: 'Error occurred!'
                });
                console.log('Error: ', error);
            });
    }

    render() {
        return (
            <div className="event-app container">
                <p>{this.state.notification}</p>
                <h1 className="center orange-text">Events</h1>
                <AddEvent/>
                <FilterEvent/>
                <Events/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchInitialEvents: (events) => {
            dispatch(fetchInitialEvents(events));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
