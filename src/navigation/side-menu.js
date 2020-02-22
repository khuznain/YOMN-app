import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { ListItem } from "react-native-elements";
import { ScrollView, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { theme } from "../constants";

class SideMenu extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <>
            <View>
              <ListItem
                onPress={() => this.props.navigation.closeDrawer()}
                titleStyle={{ color: theme.colors.gray }}
                title="All Users"
                bottomDivider
                chevron
              />
              <ListItem
                onPress={this.navigateToScreen("ItemList")}
                titleStyle={{ color: theme.colors.gray }}
                title="My Items"
                bottomDivider
                chevron
              />

              <ListItem
                onPress={this.navigateToScreen("AddItem")}
                titleStyle={{ color: theme.colors.gray }}
                title="Add Items"
                bottomDivider
                chevron
              />

              <ListItem
                onPress={() => alert("this is working")}
                titleStyle={{ color: theme.colors.gray }}
                title="Logout"
                bottomDivider
                chevron
              />
            </View>
          </>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default SideMenu;
