import React from 'react'
import {StyleSheet, View} from "react-native";

/**
 @Deprecated No longer in use for mixology
 Footer of the main view
 @returns {JSX.Element} footer component
 */
const CustomFooter = () => {
    return (
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#800020",
    }
})

export default CustomFooter
