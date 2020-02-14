import React from "react";
import { Image } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator
} from "react-navigation";

import { Welcome, Login, Register, Users } from "../screens";
import { theme } from "../constants";

const DashboardStackNavigator = createStackNavigator(
  {
    Welcome: Welcome,
    Login: Login,
    Register: Register,
    Users: Users
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        ),
        headerStyle: {
          height: theme.sizes.base * 4,
          backgroundColor: theme.colors.white, // or 'white
          borderBottomColor: "transparent",
          elevation: 0 // for android
        },
        headerBackImage: <Image source={require("../assets/icons/back.png")} />,
        headerBackTitle: null,
        headerRightContainerStyle: {
          alignItems: "center"
        }
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Dashboard: { screen: AppDrawerNavigator }
});

export default createAppContainer(AppSwitchNavigator);
