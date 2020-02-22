import React from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../constants";

// temporary data until we pull from Firebase
posts = [
  {
    id: "1",
    name: "Joe McKay",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    timestamp: 1569109273726,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage1.jpg")
  },
  {
    id: "2",
    name: "Karyn Kim",
    text:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    timestamp: 1569109273726,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage2.jpg")
  },
  {
    id: "3",
    name: "Emerson Parsons Emerson Parsons",
    text:
      "Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant.",
    timestamp: 1569109273726,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage3.jpg")
  },
  {
    id: "4",
    name: "Kathie Malone",
    text:
      "At varius vel pharetra vel turpis nunc eget lorem. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Adipiscing tristique risus nec feugiat in fermentum.",
    timestamp: 1569109273726,
    avatar: require("../assets/tempAvatar.jpg"),
    image: require("../assets/tempImage4.jpg")
  }
];

export default class HomeScreen extends React.Component {
  renderPost = post => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.navigation.navigate("UserPost")}
      >
        <View style={styles.listItem}>
          <Image source={post.avatar} style={styles.avatar} />
          <View style={{ marginLeft: 10, marginTop: 5 }}>
            <Text style={styles.name}>{post.name}</Text>
            <Text
              style={[styles.name, { color: "white", paddingTop: 15 }]}
            >{`0 Items`}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Ionicons
              name="md-menu"
              size={30}
              color={theme.colors.gray}
            ></Ionicons>
          </TouchableOpacity>
        </View>
        <FlatList
          data={posts}
          contentContainerStyle={styles.listStyle}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </SafeAreaView>
    );
  }
}

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
