import { PlayerStore } from "../../player/store";
import { observable, computed, action } from "mobx";
import Cookie from "mobx-cookie";
import { ViewStore } from "../../view/store";

export type PlayCard = 0 | 1 | 2 | 3 | 5 | 8 | 13 | 20 | 40 | 100 | "coffee" | "?";

export const sortCards = (a: PlayCard, b: PlayCard) => {
	if (a === b) return 0;

	if (a === "coffee")
		return 1;

	if (a === "?")
		return -1;

	return a < b ? 1 : -1;
}

export class AppStore {
	public playerStore: PlayerStore;
	public viewStore: ViewStore;

	@observable
	private sessionCodeCookie = new Cookie("session-code");

	constructor() {
		const urlParams = new URLSearchParams(window.location.search);

		const sessionFromUrl = urlParams.get("session");
		if (sessionFromUrl) {
			this.setSessionCode(sessionFromUrl);
		}

		this.playerStore = new PlayerStore(this);
		this.viewStore = new ViewStore();
	}


	public get cards(): PlayCard[] {
		return [
			0, 1, 2, 3, 5, 8, 13, 20, 40, 100, "coffee", "?",
		];
	}

	@computed
	public get sessionCode() {
		return this.sessionCodeCookie.value;
	}

	@action
	public setSessionCode(value: string | undefined) {
		if (value) {
			this.sessionCodeCookie.set(value, { expires: 2 });
		} else {
			this.sessionCodeCookie.remove();
		}
	}
}
