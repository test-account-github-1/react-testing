import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TestRedux = () => {
	const state = useSelector(state => state.count);

	const dispatch = useDispatch();

	const increment = () => dispatch({ type: "INCREMENT" });
	const decrement = () => dispatch({ type: "DECREMENT" });

	return (
		<>
			<h1 data-testid='counter'>{state}</h1>
			<button data-testid='button-up' onClick={increment}>
				Up
			</button>
			<button data-testid='button-down' onClick={decrement}>
				Down
			</button>
		</>
	);
};

export default TestRedux;
