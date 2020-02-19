import React from "react";
import { Image } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import {
  Welcome,
  Login,
  Register,
  Users,
  Loading,
  AddItem,
  ItemList
} from "../screens";
import SideMenu from "./side-menu";

const DashboardStackNavigator = createStackNavigator(
  {
    Users,
    AddItem,
    ItemList
  },
  {
    headerMode: "none",
    defaultNavigationOptions: {
      cardStyle: {
        backgroundColor: "transparent"
      }
    }
  }
);

const AppContainer = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardStackNavigator
    }
  },
  { contentComponent: SideMenu }
);

const AuthStack = createStackNavigator({
  Welcome: Welcome,
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
      initialRouteName: "App"
    }
  )
);

// navigationOptions: ({ navigation }) => {
//   return {
//     headerLeft: (
//       <Icon
//         style={{ paddingLeft: 10 }}
//         onPress={() => navigation.openDrawer()}
//         name="md-menu"
//         size={30}
//       />
//     )
//   };
// }
