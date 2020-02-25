import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { theme } from "../constants";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Yup from "yup";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { InputField } from "../components/formik/InputField";
import { storeUser } from "../redux/user/user.actions";
import httpServices from "../config/http-services";
import { ENDPOINTS } from "../config/const";

class RegisterScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    image: null,
    imageResult: null
  };

  componentDidMount() {
    this.getPhotoPermission();
  }

  getPhotoPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        alert(
          "We need permission to use your camera roll if you'd like to include a photo."
        );
      }
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri, imageResult: result });
    }
  };

  handleSignUp = async (values, { setSubmitting }) => {
    let localUri = this.state.imageResult.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("password", values.password);
    formData.append("image", {
      uri: localUri,
      name: filename,
      type
    });

    try {
      const { data } = await httpServices.post(ENDPOINTS.SIGN_UP, formData);
      const user = {
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        image: data.user.image
      };
      this.props.storeUser(user);
      this.props.navigation.navigate("Loading");
      Toast.show("Successfully Sign Up ");
    } catch (err) {
      Toast.show("Something went wrong ");
      console.log("Err ->", err || err.response);
    } finally {
      setSubmitting(false);
    }
  };

  render() {
    return (
      <View style={styles.container}>
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
          <TouchableOpacity style={styles.avatar} onPress={this.pickImage}>
            {this.state.image && (
              <Image
                source={{
                  uri: this.state.image ? this.state.image : undefined
                }}
                style={{
                  width: 100,
                  height: 100,
                  margin: 5,
                  borderRadius: 50
                }}
              ></Image>
            )}
            {!this.state.image && (
              <Ionicons
                name="ios-add"
                size={40}
                color="#FFF"
                style={{ marginTop: 6, marginLeft: 2 }}
              ></Ionicons>
            )}
          </TouchableOpacity>
        </View>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Enter a valid email")
              .required("This field is required"),
            name: Yup.string().required("This field is required"),
            password: Yup.string().required("This field is required")
          })}
          onSubmit={this.handleSignUp}
        >
          {props => (
            <>
              <View style={styles.form}>
                <View>
                  <InputField
                    formikProps={props}
                    formikKey="name"
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
                onPress={props.handleSubmit}
              >
                {props.isSubmitting && (
                  <ActivityIndicator size="small" color="#fff" />
                )}
                {!props.isSubmitting && (
                  <Text style={{ color: "#FFF", fontWeight: "500" }}>
                    Sign up
                  </Text>
                )}
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

export default connect(null, { storeUser })(RegisterScreen);

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
