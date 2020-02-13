import React, { Component } from "react";

import { Block, Text } from "../components";
import { theme } from "../constants";

class Welcome extends Component {
  render() {
    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h1 center bold>
            Your Home.
            <Text h1 primary>
              YOMN.
            </Text>
          </Text>
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
            Enjoy the experience.
          </Text>
        </Block>
      </Block>
    );
  }
}

export default Welcome;
