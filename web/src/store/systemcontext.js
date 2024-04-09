import { createContext, useContext, useReducer } from "react";

const ActionTypes = {
    ADD_USER: 'ADD_USER',
    IS_LOGGED_IN: 'IS_LOGGED_IN'
}

export const initialState = {
    user: {},
    isLoggedIn: false
}

export const SystemContext = createContext({});

function SystemContextReducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.ADD_USER:
            return { ...state, user: payload };
        case ActionTypes.IS_LOGGED_IN:
            return { ...state, isLoggedIn: payload }
        default:
            return { ...state };
    }
}

export default function SystemProvider({ children }) {
    const [state, dispatch] = useReducer(SystemContextReducer, initialState);


    const contextValue = {
        ...state,dispatch
    }

    return (
        <SystemContext.Provider value={contextValue}>
            {children}
        </SystemContext.Provider>
    )
}

export const useStore = () => useContext(SystemContext);
