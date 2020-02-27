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
  UpdateItem,
  UserItems
} from "../screens";
import SideMenu from "./side-menu";

const DashboardStackNavigator = createStackNavigator(
  {
    Users,
    AddItem,
    UpdateItem,
    UserItems
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

const AuthStack = createStackNavigator(
  {
    Welcome: Welcome,
    Login: Login,
    Register: Register
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

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
);
