const initState = {
    events: []
};

const activityReducer = (state = initState, action) => {

    if (action.type === 'CREATE_EVENT') {
        const newEvents = [...state.events];
        newEvents.push(action.event);

        return {
            ...state,
            events: newEvents
        }
    }

    if (action.type === 'FETCH_INITIAL_EVENT') {
        const newEvents = [...action.events];

        return {
            ...state,
            events: newEvents
        }
    }

    if (action.type === 'FILTER_EVENT') {
        const newEvents = [...action.events];

        return {
            ...state,
            events: newEvents
        }
    }

    return state;
};

export default activityReducer
