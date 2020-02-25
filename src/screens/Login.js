import React from "react";
import { connect } from "react-redux";
import Toast from "react-native-tiny-toast";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  LayoutAnimation
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { InputField } from "../components/formik/InputField";
import * as Yup from "yup";
import { Formik } from "formik";
import { theme } from "../constants";
import { storeUser } from "../redux/user/user.actions";
import httpServices from "../config/http-services";
import { ENDPOINTS } from "../config/const";

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  handleLogin = async (values, { setSubmitting }) => {
    try {
      const { data } = await httpServices.post(ENDPOINTS.LOGIN, values);
      const user = {
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        image: data.user.image
      };
      this.props.storeUser(user);
      this.props.navigation.navigate("Loading");
      Toast.show("Successfully login");
    } catch (err) {
      Toast.show("Invalid credentials");
      console.log("Error -> ", err);
    } finally {
      setSubmitting(false);
    }
  };

  render() {
    LayoutAnimation.easeInEaseOut();

    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/authHeader.png")}
          style={{ marginTop: -176, marginLeft: -50 }}
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
        <Image
          source={require("../assets/authFooter.png")}
          style={{
            position: "absolute",
            bottom: -325,
            right: -225
          }}
        ></Image>
        <Image
          source={require("../assets/loginLogo.png")}
          style={{ marginTop: -110, alignSelf: "center" }}
        ></Image>
        <Text style={styles.greeting}>{`Hello again.\nWelcome back.`}</Text>

        <View style={styles.errorMessage}></View>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Enter a valid email")
              .required("This field is required"),
            password: Yup.string().required("This field is required")
          })}
          onSubmit={this.handleLogin}
        >
          {props => (
            <>
              <View style={styles.form}>
                <View>
                  <InputField
                    formikProps={props}
                    formikKey="email"
                    label="E-Mail"
                  />
                </View>
                <View style={{ marginTop: 12 }}>
                  <InputField
                    formikKey="password"
                    formikProps={props}
                    label="Password"
                    secureTextEntry
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.button}
                disabled={props.isSubmitting}
                onPress={props.handleSubmit}
              >
                {props.isSubmitting && (
                  <ActivityIndicator size="small" color="#fff" />
                )}
                {!props.isSubmitting && (
                  <Text style={{ color: "#FFF", fontWeight: "500" }}>
                    Sign in
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={{ alignSelf: "center", marginTop: 32 }}
                onPress={() => this.props.navigation.navigate("Register")}
              >
                <Text style={{ color: "#414959", fontSize: 13 }}>
                  Don't have an account?{" "}
                  <Text
                    style={{
                      fontWeight: "500",
                      color: theme.colors.primary
                    }}
                  >
                    Sign up
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

export default connect(null, { storeUser })(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  greeting: {
    marginTop: -32,
    fontSize: 18,
    fontWeight: "400",
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
  form: {
    marginBottom: 48,
    marginHorizontal: 30
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
  }
});
