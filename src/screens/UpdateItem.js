import React from "react";
import { connect } from "react-redux";
import Toast from "react-native-tiny-toast";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Yup from "yup";
import { Formik } from "formik";
import { theme } from "../constants";
import { InputField } from "../components/formik/InputField";
import httpServices from "../config/http-services";
import { ENDPOINTS } from "../config/const";

class UpdateItem extends React.Component {
  handlePost = async (values, { setSubmitting }) => {
    try {
      const response = await httpServices.patch(
        `${ENDPOINTS.POST_ITEM}/${this.props.navigation.state.params._id}`,
        values
      );
      Toast.show("Successfully Updated Item");
      console.log("Response ->", response);
    } catch (err) {
      Toast.show("Something went wrong");
      console.log("Err ->", err || err.response);
    } finally {
      setSubmitting(false);
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
            <Text
              style={{
                fontWeight: "500",
                color: theme.colors.gray
              }}
            >
              Add Item
            </Text>
          </TouchableOpacity>
        </View>

        <Formik
          initialValues={{
            title: this.props.navigation.state.params.title || "",
            description: this.props.navigation.state.params.description || ""
          }}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("This field is required"),
            description: Yup.string().required("This field is required")
          })}
          onSubmit={this.handlePost}
        >
          {props => (
            <View style={styles.inputContainer}>
              <View>
                <InputField
                  formikProps={props}
                  value={props.values.title}
                  formikKey="title"
                  label="Title"
                />

                <InputField
                  formikProps={props}
                  formikKey="description"
                  label="Description"
                  value={props.values.description}
                  inputStyle={{ height: 100 }}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={props.handleSubmit}
                >
                  {props.isSubmitting && (
                    <ActivityIndicator size="small" color="#fff" />
                  )}
                  {!props.isSubmitting && (
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>
                      Submit
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const user = state.user;
  return user;
};

export default connect(mapStateToProps)(UpdateItem);

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
