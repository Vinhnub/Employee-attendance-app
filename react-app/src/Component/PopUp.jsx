import React, { createContext, useContext, useEffect, useState } from "react";
import styles from "./Component.module.css"

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
	const [popups, setPopups] = useState([]);

	const popup = (content, duration = 3000) => {
		const id = Date.now();
		setPopups((p) => [...p, { content, id }]);
		setTimeout(() => {
			setPopups((p) => p.filter((p) => p.id != id));
		}, duration);
	};
	return (
		<PopupContext.Provider value={popup}>
			{children}
			<PopupRenderer popups={popups} />
		</PopupContext.Provider>
	)
}

export default function PopupRenderer({ popups }) {
	return (
		<div className={styles['popup-page']}>
			{popups.map((popup) => (
				<div className={styles['popup-box']} key={popup.id}>
					{popup.content}
				</div>
			))}
		</div>
	);
}