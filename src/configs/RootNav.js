import * as React from 'react';
import {DrawerActions, StackActions} from "@react-navigation/native";

/**
 *A reference to the Navigator.
 * @type {React.RefObject<unknown>}
 */
export const navigationRef = React.createRef();

/**
 *
 * @param name {string} name of the screen to navigate to
 * @param params {object} config for the navigate function
 */
export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

/**
 * Add to the top of the navigation stack
 * @param name name of screen to be shown.
 * @param params config for the push function
 */
export function push(name, params) {
    navigationRef.current?.dispatch(StackActions.push(name, params))
}

/**
 * run this function to toggle the drawer navigator menu
 */
export function toggleDrawer() {
    navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}
