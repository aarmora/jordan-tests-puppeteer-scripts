import { action } from '../src/index';
import puppeteer from 'puppeteer';
import { stubBrowser, stubPage, stubElementHandle } from './mockPuppeteer';

jest.mock('puppeteer', () => ({
	launch() {
		return stubBrowser;
	}
}));

beforeEach(() => {
	jest.restoreAllMocks();
});

describe("action()", () => {

	test('that it should return an array with a single link', async () => {
		jest.spyOn(stubPage, '$$').mockReturnValue(Promise.resolve([stubElementHandle]));
		jest.spyOn(stubElementHandle, '$eval').mockReturnValue(Promise.resolve('https://pizza.com'));

		const result = await action();

		expect(result).toEqual(['https://pizza.com']);
	});

	test('that it should return an array with multiple links', async () => {
		jest.spyOn(stubPage, '$$').mockReturnValue(Promise.resolve([stubElementHandle, stubElementHandle]));
		const stubElementHandleSpy = jest.spyOn(stubElementHandle, '$eval')
			.mockReturnValueOnce(Promise.resolve('https://pizza.com'))
			.mockReturnValueOnce(Promise.resolve('https://github.com'));

		const result = await action();

		expect(result).toEqual(['https://pizza.com', 'https://github.com']);
		expect(stubElementHandleSpy).toHaveBeenCalledTimes(2);
	});


	test('that puppeteer.launch is called once', async () => {
		const launchSpy = jest.spyOn(puppeteer, 'launch');

		await action();

		expect(launchSpy).toHaveBeenCalledTimes(1);
	});

	test('that puppeteer.launch is called once second time', async () => {
		const launchSpy = jest.spyOn(puppeteer, 'launch');

		await action();

		expect(launchSpy).toHaveBeenCalledTimes(1);
	});

	test('that browser.newPage is called once', async () => {
		const browserNewPageSpy = jest.spyOn(stubBrowser, 'newPage');

		await action();

		expect(browserNewPageSpy).toHaveBeenCalledTimes(1);

	});

	test('that page.goto is called with "https://javascriptwebscrapingguy.com"', async () => {
		const gotoSpy = jest.spyOn(stubPage, 'goto');

		await action();

		expect(gotoSpy).toHaveBeenCalledWith('https://javascriptwebscrapingguy.com');
	});

	test('that browser.close is called once', async () => {
		const browserCloseSpy = jest.spyOn(stubBrowser, 'close');

		await action();

		expect(browserCloseSpy).toHaveBeenCalledTimes(1);
	});

});