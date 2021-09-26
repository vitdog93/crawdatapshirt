// const { default: axios } = require('axios');
// const fs = require('fs');
// const  puppeteer = require('puppeteer');
// const cheerio = require('cheerio');
// const { exportProducts } = require('./excel');
import axios from 'axios';
import fs from 'fs';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import { exportProducts } from './excel.js';
import {getProductIdFromImage, getProductVarianstUrl, getProductOldPrice} from './productutil.js';
import { getProductType, getVariantByType, variants3dClothing } from './productType.js';


// const imgUrl = "https://d2dytk4tvgwhb4.cloudfront.net/k6yn34zm/products/601938d9a03e41c48da181b6/3d-zipper-hoodie/P2-KQTIHwQ/regular.jpg"


const getProductVariants = async (url,prodId) => {
    try{
        const data = await axios.get(url);
        let variants = data.data.data.variants;
        let attributes = data.data.data.attributes;
        // const productType = getProductType(attributes);
        const prefix = data.data.data.images.prefix;
        const variantsData = getVariantByType({attributes: attributes, prefix: prefix, variants: variants});
        variants = variantsData.variants;
        const productType = variantsData.productType;
        // variants = variants3dClothing(variants,prefix);
        // variants = variants.map(variant => ({
        //     _id: variant._id,
        //     image: getVariantsImages({prefix: prefix,slug: variant.options[(variant.options).findIndex(x => x.is_preselected === true)]?.slug,sides: variant.sides}),
        //     mockup : '',
        //     sku : variant.sku,
        //     title : variant.title,
        //     cost : variant.retail_price,
        //     price : variant.retail_price,
        //     old_price :getProductOldPrice(variant.retail_price),
        //     shipping_class : "3D_CLOTHING",
        //     tax_class : "DEFAULT",
        //     default : variant.is_default,
        //     options: {
        //         product: {
        //             type : "image",
        //             title: variant.options[0].name,
        //             value: null,
        //         },
        //         size : {
        //             type : "button",
        //             title: variant.options[1].name,
        //             value : 0,
        //         }
        //     }
        // }));
        // console.log(variants);
        return {variants :variants , productType: productType };
    }catch(error){
        console.log(error);
    }
}


const getProduct = async (url) => {
    try{
        return  await new Promise (async(resolve, reject) => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            let data = await page.content();
            const $ = cheerio.load(data);
            const productName = $(".ProductTitle h1").text().trim();
            const productDescripiton = $(".ProductDescription").html();
            const productImageUrl = $(".ImagePreview .Image img").attr("src");
            const productId = getProductIdFromImage(productImageUrl);
            const productVariantsUrl = getProductVarianstUrl(productId);
            const productVariants = await getProductVariants(productVariantsUrl,productId);
            const productVariant = productVariants.variants;
            const productType = productVariants.productType;
            const indexofDefault = productVariant.findIndex(x => x.default === true);
            const productPrice = productVariant[indexofDefault].price;
            const productOldPrice = getProductOldPrice(productPrice);
            const product  = {
                productName,
                productDescripiton,
                productVariant,
                productType,
                productPrice,
                productOldPrice,
            }
            // console.log(product);
            await browser.close();
            resolve(product);
        });
    }catch(error){
        console.log(error);
    }
}
export const getProducts = async (urls) => {
    try{
        const products = [];
        for (const url of urls ) {
            const product = await getProduct(url);
            products.push(product);
        }
        // console.log(products);
        // return;
        const filename = await exportProducts(products);
        return filename;
        // fs.writeFile("./products.txt", JSON.stringify(products), function(err) {
        //     if(err) {
        //         return console.log(err);
        //     }
        
        //     console.log("The file was saved!");
        // }); 
    }catch(e){
        console.log(e);
    }
}
const scrapingItems = [
    "https://piaceshirt.com/3d-shirt-n94-1",
    // "https://piaceshirt.com/fabric-mask-1-s98",
    // "https://piaceshirt.com/htv-155-1",
    // "https://piaceshirt.com/q05-htv",
    // "https://piaceshirt.com/vet-3d-full-print-999-nss",
    // "https://piaceshirt.com/bear-hunter-3d-full-print-hta-a-3d-094-1",
    // "https://piaceshirt.com/cat-music-hta-1",
    // "https://piaceshirt.com/mc95-tiger-family",
    // "https://piaceshirt.com/faith-hez98-72-only-sale-today",
    // "https://piaceshirt.com/frog-love-3d-full-print-h98-only-sale-today-1"
];

getProducts(scrapingItems);

