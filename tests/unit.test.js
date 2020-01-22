import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import App from "../pages/index";

describe("With Enzyme", () => {
  it('App shows "Bion is Cool"', () => {
    const app = shallow(<App />);

    expect(app.find("#hero-title").text()).toContain("Bion is Cool");
  });
});

describe("With Snapshot Testing", () => {
  it('App shows "Bion is Cool"', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
