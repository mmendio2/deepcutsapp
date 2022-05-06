const { default: SearchBar } = require("./SearchBar");
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event";

test('searchbar renders', () => {
    render(<SearchBar/>)
});
