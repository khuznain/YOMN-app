import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback
} from "react-native";

import httpServices from "../config/http-services";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../constants";
import { ENDPOINTS, BASE_URL } from "../config/const";

export default HomeScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  getUsers = async () => {
    setLoading(true);
    try {
      const { data } = await httpServices.get(ENDPOINTS.USERS);
      setUsers(data.users);
      // console.log("this is users ->", response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  renderPost = item => {
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("UserItems", item)}
      >
        <View style={styles.listItem}>
          <Image
            source={{
              uri: `${BASE_URL}/${item.image}`
            }}
            style={styles.avatar}
          />
          <View style={{ marginLeft: 10, marginTop: 5 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={[styles.name, { color: "white", paddingTop: 15 }]}>
              {item.items.length}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons
            name="md-menu"
            size={30}
            color={theme.colors.gray}
          ></Ionicons>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        contentContainerStyle={styles.listStyle}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => renderPost(item)}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4d4d4d"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    backgroundColor: "#ffff",
    borderBottomColor: "#D8D9DB"
  },
  listStyle: {
    flex: 1,
    flexDirection: "column"
  },
  listItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292929",
    margin: 5,
    padding: 15,
    maxWidth: Dimensions.get("window").width / 2,
    flex: 0.5,
    borderRadius: 5
  },
  avatar: {
    borderColor: "#D8D9DB",
    backgroundColor: "#f2f2f2",
    borderWidth: 0.5,
    width: 60,
    height: 60,
    borderRadius: 30
  },
  name: {
    fontSize: 16,
    paddingTop: 10,
    fontWeight: "400",
    textAlign: "center",
    color: theme.colors.secondary
  }
});
