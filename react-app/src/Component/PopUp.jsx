import React, { createContext, useContext, useEffect, useState } from "react";
import styles from "./Component.module.css"

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
	const [popups, setPopups] = useState([]);

	const popup = (content, type = 'top-box', duration = 3000) => {
		const id = Date.now();
		const close = () => setPopups((p) => p.filter((p) => p.id != id));
		setPopups((p) => [...p, { content, id, type, close }]);
		setTimeout(close, duration);
		return close;
	};
	return (
		<PopupContext.Provider value={popup}>
			{children}
			<PopupRenderer popups={popups} />
		</PopupContext.Provider>
	)
}

export default function PopupRenderer({ popups }) {
	const types = [...new Set(popups.map((p) => p.type))];
	return (
		<>
			{types.map((type) => {
				const tpopup = popups.filter((p) => (p.type === type));
				return (<div className={styles[`${type}-page`]} key={type}>
					{tpopup.map((popup) => (
						<div className={styles[type]} key={popup.id}>
							{popup.content}
						</div>
					))}
				</div>)
			})}
		</>
	);
}