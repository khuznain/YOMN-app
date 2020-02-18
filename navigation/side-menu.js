import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { ListItem } from "react-native-elements";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";

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
                title="All Users"
                leftIcon="av-timer"
                bottomDivider
                chevron
              />
              <ListItem
                title="My Items"
                leftIcon="av-timer"
                bottomDivider
                chevron
              />

              <ListItem
                title="Add Items"
                leftIcon="av-timer"
                bottomDivider
                chevron
              />

              <ListItem
                title="Logout"
                leftIcon="av-timer"
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
