"use client"

import { createContext, useReducer } from "react";

const initialState = {
    showSideBar : false,
    camera : false,
    profile_url : null,
    account : null,
    profile : null,
    profileId : null
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const { type, payload } = action;
        
        switch(type) {
            case "Display/Hide SideBar" :
                return {
                    ...state,
                    showSideBar : payload.showSideBar
                };
            case "Display/Hide Camera" :
                return {
                    ...state,
                    camera : payload.camera
                };
            case "Set Profile DataURL" :
                console.log(payload)
                return {
                    ...state,
                    profile_url : payload.profile_url
                };
            case "Set Account" :
                return {
                    ...state,
                    profile_url : payload.profile_url
                };
            case "Set Profile and ProfileId" :
                console.log(payload)
                return {
                    ...state,
                    profile : payload.profile,
                    profileId : payload.profileId
                };
            default :
                throw new Error()
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };