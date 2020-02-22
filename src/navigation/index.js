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
  ItemList,
  UserPost
} from "../screens";
import SideMenu from "./side-menu";

const DashboardStackNavigator = createStackNavigator(
  {
    Users,
    AddItem,
    ItemList,
    UserPost
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
