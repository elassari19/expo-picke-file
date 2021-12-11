import React from "react";
import renderer from 'react-test-renderer';

import PickerFiles from ".";

describe("<PickerFiles />", async() => {

  it("has 2 child", () => {
    const tree: any = renderer.create(
      <PickerFiles  />
    ).toJSON()
    expect(tree?.children?.length).toBe(2)
  })

})
