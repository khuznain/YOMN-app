import React from "react";
import { Image } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import { Welcome, Login, Register, Users, Loading } from "../screens";
import { theme } from "../constants";
import SideMenu from "./side-menu";

const DashboardStackNavigator = createStackNavigator({
  Users: {
    screen: Users,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  },
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerBackImage: <Image source={require("../assets/icons/back.png")} />,
      headerBackTitle: null,
      headerRightContainerStyle: {
        alignItems: "center"
      }
    };
  }
});

const AppContainer = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardStackNavigator
    }
  },
  { contentComponent: SideMenu }
);

const AuthStack = createStackNavigator({
  Login: Login,
  Register: Register
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: "Auth"
    }
  )
);
