import React, {useReducer} from "react";
import { GlobalReducer } from "./GlobalReducer";
import { initialState, GlobalContext } from "./GlobalContext";

const GlobalStore = ({children}) => {
    const [state, dispatch] = useReducer(GlobalReducer, initialState)

    const dispatchWrapper = (actionPromise) => {
        actionPromise.then(response => dispatch(response))
    }

    const dispatchSelector = (action) => {
        if (action.then) {
            dispatchWrapper(action)
        }
        else {
            dispatch(action)
        }
    }

    return (
        <GlobalContext.Provider value={{state, dispatch: dispatchSelector}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalStore