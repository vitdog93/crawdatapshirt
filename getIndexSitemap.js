const { default: axios } = require('axios');
const fs = require('fs');
// const flow = require('xml-flow');
// const https = require('https');
const cheerio = require('cheerio');
const convert = require('xml-js');
const productDetail = require('./productdetail');

var file = fs.createWriteStream('site.xml');
const site_map_url = "https://piaceshirt.com/next-api/sitemap/index.xml";

async function getSitemap(site_map_url){
    try {
        const content = await axios.get(site_map_url)
        const $ = cheerio.load(content.data, {
                xml: {
                    xmlMode: true,
                    decodeEntities: true, // Decode HTML entities.
                    ithStartIndices: false, // Add a `startIndex` property to nodes.
                    withEndIndices: false, // Add an `endIndex` property to nodes.
                }
            });
            const xml = $.xml();
            const sitemapJson = convert.xml2json(xml,{compact: true, spaces: 1});
            let data = JSON.parse(sitemapJson).sitemapindex.sitemap;
            siteMaps = [];
            data.forEach((e,i) => {
                var url = e.loc._text;
                siteMaps.push(url);
            });
            console.log(siteMaps);
            siteMapProd = []
            siteMaps.forEach(async(e,i) => {
                let prds = []
                try {
                    const prd  = await getSitemapProd(e);
                    prds.push(prd)
                    console.log(prds);
                } catch (error) {
                    console.log(error);
                }
                
            })
    } catch (error) {
        console.log(error);
    }
    
};

async function getSitemapProd(site_map_url){
    try {
        site_map_url = "https://piaceshirt.com/next-api/sitemap/products/page/1.xml";
        const constent =  await axios.get(site_map_url)
        const $ = cheerio.load(constent.data, {
            xml: {
                xmlMode: true,
                decodeEntities: true, // Decode HTML entities.
                ithStartIndices: false, // Add a `startIndex` property to nodes.
                withEndIndices: false, // Add an `endIndex` property to nodes.
            }
        });
        const xml = $.xml();
        const sitemapJson = convert.xml2json(xml,{compact: true, spaces: 1});
        let data = JSON.parse(sitemapJson).urlset.url;
        siteMaps = [];
        var bar = new Promise((resolve, reject) => {
            data.forEach((value, index, array) => {
                console.log(value);
                var url = value.loc._text;
                const product = await productDetail.getProduct(url);
                console.log(product);
                siteMaps.push(url);
                if (index === array.length -1) resolve();
            });
        });
        
        bar.then(() => {
            console.log('All done!');
        }).catch((error) =>{
            console.log(error);
        });
        data.forEach(async(e,i) => {
            var url = e.loc._text;
            try {
                const product = await productDetail.getProduct(url);
                console.log(product);
                siteMaps.push(url);
            } catch (error) {
                console.log(error);
            }
        });
        console.log(siteMaps);
        return siteMaps;
    } catch (error) {
        console.log(error);
    }
};

// getSitemap(site_map_url);
getSitemapProd("https://piaceshirt.com/next-api/sitemap/products/page/1.xml");
// getSitemapProd('https://piaceshirt.com/next-api/sitemap/products/page/1.xml');

module.exports = getSitemap;



