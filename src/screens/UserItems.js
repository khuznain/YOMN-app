import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../constants";
import { Text, Divider, Block, EmptyMessage, MapModal } from "../components";
import httpServices from "../config/http-services";
import { ENDPOINTS, BASE_URL } from "../config/const";

// _id -> this is user
const UserItem = ({ navigation, _id, image }) => {
  const [items, setItems] = useState([]);
  const [userItem] = useState(navigation.state.params);
  const [isLoading, setLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  getUser = async () => {
    // If not from the user list page -
    // User click from the side menu -
    let userId = userItem ? userItem.id : _id;

    setLoading(true);
    try {
      const { data } = await httpServices.get(`${ENDPOINTS.USER}/${userId}`);
      setItems(data.items);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  deleteItem = async id => {
    try {
      const response = await httpServices.delete(
        `${ENDPOINTS.DELETE_ITEM}/${id}`
      );
      console.log("Response", response);
      getUser();
    } catch (err) {
      console.log("Error ->", err);
    }
  };

  renderPost = item => {
    // console.log("Item ->", item)
    return (
      <View style={styles.listItem}>
        <Image
          style={styles.image}
          source={{
            uri: `${BASE_URL}/${item.image}`
          }}
        />

        <Text
          align="center"
          weight="bold"
          h3
          gray
          style={{ marginVertical: 10 }}
        >
          {item.title}
        </Text>

        <Text align="center" h3 gray>
          {item.address}
        </Text>

        <Block row space="around" margin={[20, 0, 0, 0]}>
          {/* _id -> this is user */}
          {_id === item.creator && (
            <TouchableOpacity
              style={[styles.button, { marginLeft: -5 }]}
              onPress={() => navigation.navigate("UpdateItem", item)}
            >
              <Text style={{ color: "#FFF", fontWeight: "500" }}>Edit</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.buttonSecondary]}
            onPress={() => {
              setVisibleModal(true);
              setLocation(item.location);
            }}
          >
            <Text style={{ color: theme.colors.primary, fontWeight: "500" }}>
              Show Map
            </Text>
          </TouchableOpacity>
          {/* _id -> this is user */}
          {_id === item.creator && (
            <TouchableOpacity
              style={[styles.button, { marginRight: -5 }]}
              onPress={() => deleteItem(item._id)}
            >
              <Text style={{ color: "#FFF", fontWeight: "500" }}>Delete</Text>
            </TouchableOpacity>
          )}
        </Block>
        <Divider></Divider>
      </View>
    );
  };

  let userImage = userItem ? userItem.image : image;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="md-arrow-back"
            size={24}
            color={theme.colors.gray}
          ></Ionicons>
        </TouchableOpacity>

        <Image
          style={{ height: 35, width: 35, borderRadius: 35 / 2 }}
          source={{ uri: `${BASE_URL}/${userImage}` }}
        ></Image>
      </View>

      <FlatList
        data={items}
        contentContainerStyle={styles.listStyle}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyMessage isLoading={isLoading} errorText="No Data Available" />
        }
        renderItem={({ item }) => renderPost(item)}
        keyExtractor={item => item.id}
        numColumns={1}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        isVisible={visibleModal}
        onSwipeComplete={() => setVisibleModal(false)}
        onBackdropPress={() => setVisibleModal(false)}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <MapModal location={location} />
      </Modal>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  const user = state.user;
  return user;
};

export default connect(mapStateToProps)(UserItem);

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
  listStyle: {
    flex: 1,
    paddingTop: 10
  },
  listItem: {
    width: "90%",
    marginLeft: 15
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
