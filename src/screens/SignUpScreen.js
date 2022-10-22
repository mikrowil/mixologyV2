import React, {useState} from "react";
import * as yup from 'yup'
import {StyleSheet, View} from "react-native";
import {Button, Input, Text} from 'react-native-elements'
import {signUp} from '../redux/actions/authActions'
import {useDispatch} from "react-redux";
import {Form, Formik} from "formik";
import TextField from "../components/ui-kit/TextField";

const validationSchema = yup.object({
    email:yup.string().email("Must be a valid email").required("Email is required"),
    password:yup.string().min(8, "Must be at least 8 characters long").required("Password is required")
})

const formikInitialValues = {
    email:"",
    password:""
}

/**
 * The sign up screen is used for creating a user from the provided username and password.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SignUpScreen() {

    const [validateOnChange, setValidateOnChange] = useState(false)

    const dispatch = useDispatch()

    const handleSubmit = ({email, password}) =>{

        dispatch(signUp({email, password}))
    }

    return (
        <View style={styles.container}>
            <Text h1>Sign up screen</Text>

            <Formik
                initialValues={formikInitialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                validateOnChange={validateOnChange}

            >
                {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit
                  })=>(
                    <View>
                        <TextField
                            name={"email"}
                            errorMessage={errors.email}
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            placeholder={"Email"}
                            onChangeText={handleChange("email")}
                            value={values.email}
                        />
                        <TextField
                            name={"password"}
                            errorMessage={errors.password}
                            secureTextEntry
                            autoCapitalize={"none"}
                            autoCorrect={false}
                            placeholder={"Password"}
                            onChangeText={handleChange("password")}
                            value={values.password}
                        />
                        <Button
                            title={"Sign up"}
                            onPress={()=>{
                                setValidateOnChange(true)
                                handleSubmit()
                            }}
                        />
                    </View>
                )}
            </Formik>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:10,
        paddingVertical:"50%"
    },
    title: {
        marginVertical: 'auto',
    },
    errMessage: {
        fontSize: 16,
        color: 'red',
    }
})
