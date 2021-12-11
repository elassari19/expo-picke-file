import React from "react";
import renderer from 'react-test-renderer';

import Pictures from ".";

describe("<Pictures />", async() => {

  it("has 2 child", () => {
    const tree: any = renderer.create(
      <Pictures  />
    ).toJSON()
    expect(tree?.children?.length).toBe(2)
  })

})
