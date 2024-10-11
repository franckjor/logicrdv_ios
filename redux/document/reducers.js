import {
    LIST_MESSAGES_REQUEST,
    LIST_MESSAGES_SUCCESS,
    LIST_MESSAGES_FAILURE,
} from './types';
const initialState = {
    listMessages: [],
    isLoading: true,
};

const MessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_MESSAGES_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case LIST_MESSAGES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listMessages: action.payload
            };
        case LIST_MESSAGES_FAILURE:
            return {
                ...state,
                isLoading: false,
                listMessages: []
            };
        default:
            return state;
    }
};

export default MessageReducer;