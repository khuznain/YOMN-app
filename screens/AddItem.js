import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
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
      <SafeAreaView style={styles.container}>
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
                <View>
                  <InputField
                    formikProps={props}
                    formikKey="title"
                    label="Title"
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <InputField
                    formikProps={props}
                    formikKey="description"
                    label="Description"
                    numberOfLines={4}
                  />
                </View>

                <View style={{ marginTop: 10 }}>
                  <InputField
                    formikProps={props}
                    formikKey="address"
                    label="Address"
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>

        {/* <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
          <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
          <Image
            source={{ uri: this.state.image ? this.state.image : undefined }}
            style={{ width: "100%", height: "100%" }}
          ></Image>
        </View> */}
      </SafeAreaView>
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
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB"
  },
  inputContainer: {
    marginTop: 30,
    alignSelf: "center",
    width: "90%"
  }
});
