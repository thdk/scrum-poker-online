import * as React from "react";

import "./card.css";

export type CardProps = {
	value: any;
}

export const Card = (props: CardProps & React.HTMLProps<HTMLDivElement>) => {
	const { value, ...restProps } = props;

	return <div className="card-container" {...restProps}>
		<div className="card">{value}</div>
	</div>
};
