import React, { createContext, useContext, useReducer } from "react";
const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW':
            return action.payload
        case 'HIDE':
            return ''
        default:
            return state
    }
};
const NotificationContext = createContext()

// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer,'')
    return (
        <NotificationContext.Provider value={[notification, dispatch]}>
            {children}
        </NotificationContext.Provider>
    )

}
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}