import "@testing-library/jest-dom/extend-expect";
import {
	cleanup,
	fireEvent,
	render,
	waitForElement,
} from "@testing-library/react";
import axiosMock from "axios";
import React from "react";
import TestAxios from "./components/TestAxios";

// it("should take a snapshot", () => {
// 	const { asFragment } = render(<App />);

// 	expect(asFragment(<App />)).toMatchSnapshot();
// });

// it("should equal to 0", () => {
// 	const { getByTestId } = render(<TestElements />);
// 	expect(getByTestId("counter")).toHaveTextContent(0);
// });

// it("should be enabled", () => {
// 	const { getByTestId } = render(<TestElements />);
// 	expect(getByTestId("button-up")).not.toHaveAttribute("disabled");
// });

// it("should be disabled", () => {
// 	const { getByTestId } = render(<TestElements />);
// 	expect(getByTestId("button-down")).toBeDisabled();
// });

// it("increments counter", () => {
// 	const { getByTestId } = render(<TestEvents />);

// 	fireEvent.click(getByTestId("button-up"));

// 	expect(getByTestId("counter")).toHaveTextContent("1");
// });

// it("decrements counter", () => {
// 	const { getByTestId } = render(<TestEvents />);

// 	fireEvent.click(getByTestId("button-down"));

// 	expect(getByTestId("counter")).toHaveTextContent("-1");
// });

// it("increments counter after 0.5s", async () => {
// 	const { getByTestId, getByText } = render(<TestAsync />);

// 	fireEvent.click(getByTestId("button-up"));

// 	const counter = await waitForElement(() => getByText("1"));

// 	expect(counter).toHaveTextContent("1");
// });

// it("checks initial state is equal to 0", () => {
// 	const { getByTestId } = renderWithRedux(<TestRedux />);
// 	expect(getByTestId("counter")).toHaveTextContent(0);
// });

// const renderWithRedux = (
// 	component,
// 	{ initialState, store = createStore(reducer, initialState) } = {},
// ) => {
// 	return {
// 		...render(<Provider store={store}>{component}</Provider>),
// 		store,
// 	};
// };

// it("increments the counter through redux", () => {
// 	const { getByTestId } = renderWithRedux(<TestRedux />, {
// 		initialState: { count: 5 },
// 	});
// 	fireEvent.click(getByTestId("button-up"));
// 	expect(getByTestId("counter")).toHaveTextContent("6");
// });

// it("decrements the counter through redux", () => {
// 	const { getByTestId } = renderWithRedux(<TestRedux />, {
// 		initialState: { count: 100 },
// 	});
// 	fireEvent.click(getByTestId("button-down"));
// 	expect(getByTestId("counter")).toHaveTextContent("99");
// });

// it("checks if initial state is equal to 0", () => {
// 	const { getByTestId } = renderWithContext(<Counter />);
// 	expect(getByTestId("counter")).toHaveTextContent(0);
// });

// const renderWithContext = component => {
// 	return {
// 		...render(
// 			<CounterProvider value={CounterContext}>{component}</CounterProvider>,
// 		),
// 	};
// };

// it("increments the counter", () => {
// 	const { getByTestId } = renderWithContext(<Counter />);

// 	fireEvent.click(getByTestId("button-up"));
// 	expect(getByTestId("counter")).toHaveTextContent("1");
// });

// it("decrements the counter", () => {
// 	const { getByTestId } = renderWithContext(<Counter />);

// 	fireEvent.click(getByTestId("button-down"));
// 	expect(getByTestId("counter")).toHaveTextContent("-1");
// });

// it("should render the home page", () => {
// 	const { container, getByTestId } = renderWithRouter(<TestRouter />);
// 	const navbar = getByTestId("navbar");
// 	const link = getByTestId("home-link");

// 	expect(container.innerHTML).toMatch("Home page");
// 	expect(navbar).toContainElement(link);
// });

// const renderWithRouter = component => {
// 	const history = createMemoryHistory();
// 	return {
// 		...render(<Router history={history}>{component}</Router>),
// 	};
// };

// it("should navigate to the about page", () => {
// 	const { container, getByTestId } = renderWithRouter(<TestRouter />);

// 	fireEvent.click(getByTestId("about-link"));

// 	expect(container.innerHTML).toMatch("About page");
// });

// it("should navigate to the contact page with the params", () => {
// 	const { container, getByTestId } = renderWithRouter(<TestRouter />);

// 	fireEvent.click(getByTestId("contact-link"));

// 	expect(container.innerHTML).toMatch("John Doe");
// });

afterEach(cleanup);

jest.mock("axios");

it("should display a loading text", () => {
	const { getByTestId } = render(<TestAxios />);

	expect(getByTestId("loading")).toHaveTextContent("Loading...");
});

it("should load and display the data", async () => {
	const url = "/greeting";
	const { getByTestId } = render(<TestAxios url={url} />);

	axiosMock.get.mockResolvedValueOnce({
		data: { greeting: "hello there" },
	});

	fireEvent.click(getByTestId("fetch-data"));

	const greetingData = await waitForElement(() => getByTestId("show-data"));

	expect(axiosMock.get).toHaveBeenCalledTimes(1);
	expect(axiosMock.get).toHaveBeenCalledWith(url);
	expect(greetingData).toHaveTextContent("hello there");
});
