import React from "react";
import { View, TouchableOpacity } from "react-native";
import {act, create, ReactTestRenderer} from 'react-test-renderer';

import Camera from ".";
import {styles} from "."

describe("<Camera />", async() => {

  let tester = create(<Camera />);

  void it("has 1 children" ,() => {

    const tree: any = tester.toJSON()
    expect(tree.children?.length).toBe(1)

  })



})
