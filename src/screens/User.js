import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../constants";
import { Text, Divider, Block } from "../components";
import httpServices from "../config/http-services";
import { ENDPOINTS } from "../config/const";

export default User = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [user] = useState(navigation.state.params);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  getUser = async () => {
    setLoading(true);
    try {
      const { data } = await httpServices.get(`${ENDPOINTS.USER}/${user.id}`);
      console.log("this is users ->", data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {console.log("state ->", navigation)}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="md-arrow-back"
            size={24}
            color={theme.colors.gray}
          ></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity onPress={null}>
          <Image
            style={{ height: 35, width: 35, borderRadius: 35 / 2 }}
            source={{ uri: `http://localhost:5000/${user.image}` }}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require("../assets/tempImage2.jpg")}
        />

        <Text
          align="center"
          weight="bold"
          h3
          gray
          style={{ marginVertical: 10 }}
        >
          This the title
        </Text>

        <Text align="center" h3 gray>
          This the location
        </Text>

        <Block row space="around" margin={[20, 0, 0, 0]}>
          <TouchableOpacity
            style={[styles.button, { marginLeft: -5 }]}
            onPress={null}
          >
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonSecondary]} onPress={null}>
            <Text style={{ color: theme.colors.primary, fontWeight: "500" }}>
              Show Map
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginRight: -5 }]}
            onPress={null}
          >
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Edit</Text>
          </TouchableOpacity>
        </Block>
        <Divider></Divider>
      </View>
    </ScrollView>
  );
};

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
  content: {
    marginTop: 10,
    alignSelf: "center",
    width: "90%"
  },
  image: {
    height: 150,
    width: "100%"
  },
  button: {
    width: "30%",
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonSecondary: {
    width: "30%",
    borderColor: theme.colors.primary,
    borderWidth: 0.5,
    borderRadius: 4,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  }
});
