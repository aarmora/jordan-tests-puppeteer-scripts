import { Browser, Page, ElementHandle } from "puppeteer";

export const stubPage = {
	goto(url: string) {
		return Promise.resolve();
	},
	$$(selector: string): Promise<ElementHandle[]> {
		return Promise.resolve([]);
	},
	$(selector: string) {
		return Promise.resolve();
	},
	$eval(selector: string, pageFunction: any) {
		return Promise.resolve();
	}
} as unknown as Page;

export const stubBrowser = {
	newPage() {
		return Promise.resolve(stubPage);
	},
	close() {
		return Promise.resolve();
	}
} as unknown as Browser;

export const stubPuppeteer = {
	launch() {
		return Promise.resolve(stubBrowser);
	}
} as unknown as any;

export const stubElementHandle = {
	$eval() {
		console.log('stub element handle');
		return Promise.resolve();
	}
} as unknown as ElementHandle;