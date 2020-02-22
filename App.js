import React from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { Provider } from "react-redux";
import { SafeAreaView } from "react-navigation";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "./src/redux/store";
import Navigation from "./src/navigation";

// import all used images
const images = [];

console.disableYellowBox = true;
export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.handleResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <Navigation />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}
