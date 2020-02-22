import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image
} from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";
import { Formik } from "formik";
import { theme } from "../constants";
import { InputField } from "../components/formik/InputField";

export default class PostScreen extends React.Component {
  state = {
    image: null
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

  handlePost = () => {};

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons
              name="md-arrow-back"
              size={24}
              color={theme.colors.gray}
            ></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onPress={null}>
            <Text style={{ fontWeight: "500", color: theme.colors.gray }}>
              Add Item
            </Text>
          </TouchableOpacity>
        </View>

        <Formik
          initialValues={{ title: "", description: "", address: "" }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("This field is required"),
            description: Yup.string().required("This field is required"),
            address: Yup.string().required("This field is required")
          })}
          onSubmit={() => alert("this is working...")}
        >
          {props => (
            <View style={styles.inputContainer}>
              <View>
                <InputField
                  formikProps={props}
                  formikKey="title"
                  label="Title"
                />

                <InputField
                  formikProps={props}
                  formikKey="description"
                  label="Description"
                  inputStyle={{ height: 100 }}
                />

                <InputField
                  formikProps={props}
                  formikKey="address"
                  label="Address"
                />

                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={this.pickImage}
                >
                  <Ionicons
                    name="md-camera"
                    size={32}
                    color={theme.colors.primary}
                  ></Ionicons>

                  <View style={styles.image}>
                    <Image
                      source={{
                        uri: this.state.image ? this.state.image : undefined
                      }}
                      style={{ width: "100%", height: "100%" }}
                    ></Image>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={props.handleSubmit}
                >
                  <Text style={{ color: "#FFF", fontWeight: "500" }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB"
  },
  inputContainer: {
    marginTop: 30,
    alignSelf: "center",
    width: "90%"
  },
  button: {
    marginTop: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme.colors.primary,
    borderWidth: 0.5,
    height: 200,
    width: "100%"
  },
  image: {
    position: "absolute",
    top: 5,
    left: 5,
    right: 5,
    bottom: 5
  }
});
