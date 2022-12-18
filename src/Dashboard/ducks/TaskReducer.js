const UPDATE_TASK_LIST = 'assessment/tasks/update_task_list'

const initialState = {
    tasks: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TASK_LIST:
            return { ...state, tasks: action.value };
        default:
            return state;
    }
};


export const updateTaskList = (value) => ({
    type: UPDATE_TASK_LIST,
    value: value
})