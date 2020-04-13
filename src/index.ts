import puppeteer from 'puppeteer';

(async () => {

	action();
})();



export async function action() {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	const url = 'https://javascriptwebscrapingguy.com';

	await page.goto(url)

	const entryTitlesHandles = await page.$$('h2.entry-title');

	const links: any[] = [];

	for (let i = 0; i < entryTitlesHandles.length; i++) {
		const link = await entryTitlesHandles[i].$eval('a', element => element.getAttribute('href'));

		links.push(link);
	}

	await browser.close();

	return links;

}