const puppeteer = require('puppeteer');
const download = require('image-downloader');

(async() => {
    const browser = await puppeteer.launch({ headless: false});
    console.log('Browser openned');
    const page = await browser.newPage();
    for(i = 1;i<100;i++){
        const url = 'http://ngamvn.net/anh-girl?page='+ i;
        await page.goto(url);
        await page.setDefaultNavigationTimeout(0); 
        console.log('Page loaded');

        const imgLinks = await page.evaluate(() => {
            let imgElements = document.querySelectorAll('.pic img');
            imgElements = [...imgElements];
            let imgLinks = imgElements.map(i => "http://ngamvn.net" + i.getAttribute('src'));
            return imgLinks;
        });
        // Tải các ảnh này về thư mục hiện tại
        await Promise.all(imgLinks.map(imgUrl => download.image({
            url: imgUrl,
            dest: __dirname
        })));
    }
    await browser.close();
})();