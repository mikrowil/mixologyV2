import React from "react";
import {Input} from "react-native-elements";

export default function TextField({
    ...props
                                  }){

    return(
        <Input
            {...props}
        />
    )
}
