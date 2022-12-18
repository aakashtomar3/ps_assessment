const REDUX_STATE_DATA = "_redux_state_data";

export default class StateLoader {

    loadState() {
        try {
            let serializedState = sessionStorage.getItem(REDUX_STATE_DATA);

            if (serializedState === null) {
                return this.initializeState();
            }

            return JSON.parse(serializedState);
        }
        catch (err) {
            return this.initializeState();
        }
    }

    saveState(state, ignored=[]) {
        try {
            ignored.forEach(item => { state[item.key] = item.initial_state})
            let serializedState = JSON.stringify(state);
            sessionStorage.setItem(REDUX_STATE_DATA, serializedState);

        }
        catch (err) {
        }
    }

    initializeState() {
        return {
            //state object
        };
    }
}