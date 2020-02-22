import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Yup from "yup";
import { Formik } from "formik";
import { theme } from "../constants";
import { InputField } from "../components/formik/InputField";

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  handleSignUp = () => {};

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <Image
          source={require("../assets/authHeader.png")}
          style={{ marginTop: -116, marginLeft: -50 }}
        ></Image>
        <Image
          source={require("../assets/authFooter.png")}
          style={{ position: "absolute", bottom: -325, right: -225 }}
        ></Image>
        <TouchableOpacity
          style={styles.back}
          hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
          onPress={() => this.props.navigation.goBack()}
        >
          <Ionicons
            name="ios-arrow-round-back"
            size={32}
            color="#FFF"
          ></Ionicons>
        </TouchableOpacity>
        <View
          style={{
            position: "absolute",
            top: 64,
            alignItems: "center",
            width: "100%"
          }}
        >
          <Text
            style={styles.greeting}
          >{`Hello!\nSign up to get started.`}</Text>
          <TouchableOpacity style={styles.avatar}>
            <Ionicons
              name="ios-add"
              size={40}
              color="#FFF"
              style={{ marginTop: 6, marginLeft: 2 }}
            ></Ionicons>
          </TouchableOpacity>
        </View>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Enter a valid email")
              .required("This field is required"),
            username: Yup.string().required("This field is required"),
            password: Yup.string().required("This field is required")
          })}
          onSubmit={() => alert("this is working...")}
        >
          {props => (
            <>
              <View style={styles.form}>
                <View>
                  <InputField
                    formikProps={props}
                    formikKey="username"
                    label="Your name"
                  />
                </View>

                <InputField
                  formikProps={props}
                  formikKey="email"
                  label="E-Mail"
                />

                <InputField
                  formikKey="password"
                  formikProps={props}
                  label="Password"
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={this.handleSignUp}
              >
                <Text style={{ color: "#FFF", fontWeight: "500" }}>
                  Sign up
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ alignSelf: "center", marginTop: 20 }}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text style={{ color: "#414959", fontSize: 13 }}>
                  Already have an account?{" "}
                  <Text
                    style={{ fontWeight: "500", color: theme.colors.primary }}
                  >
                    Sign in
                  </Text>
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: "#FFF"
  },
  form: {
    marginTop: 30,
    marginHorizontal: 30
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase"
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D"
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  error: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  },
  back: {
    position: "absolute",
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: "#E1E2E6",
    borderRadius: 50,
    marginTop: 48,
    justifyContent: "center",
    alignItems: "center"
  }
});
