import React from "react";
import ReactDOM from "react-dom";
import Search from "../Search";
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Search />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// Was trying to do test for use effects but got lost in the sauce...