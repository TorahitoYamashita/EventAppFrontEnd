export const createEvent = (event) => {
    return {
        type: 'CREATE_EVENT',
        event
    }
};

export const fetchInitialEvents = (events) => {
    return {
        type: 'FETCH_INITIAL_EVENT',
        events
    }
};

export const filterEvent = (events) => {
    return {
        type: 'FILTER_EVENT',
        events
    }
};
