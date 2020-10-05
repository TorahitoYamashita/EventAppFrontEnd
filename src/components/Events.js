import React, {Component} from 'react';
import {connect} from "react-redux";

class Events extends Component {
    render() {
        const {events} = this.props;
        const eventList = events.length
            ? (
                events.map(event => {
                    return (
                        <div className='collection-item' key={event.id}>
                            <span><b>| ID: </b>{event.id} </span>
                            <span><b>| Created At: </b>{event.createdAt} </span>
                            <span><b>| Email: </b>{event.email} </span>
                            <span><b>| Environment: </b>{event.environment} </span>
                            <span><b>| Component: </b>{event.component} </span>
                            <span><b>| Message: </b>{event.message} </span>
                        </div>
                    )
                })
            )
            : (
                <p className='center'>There's no event</p>
            );


        return (
            <div className="events collection">
                {eventList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.events
    }
};

export default connect(mapStateToProps)(Events);
