// const xl = require ("excel4node");
// const fs = require('fs');
// const moment = require('moment');
import xl from 'excel4node';
import fs from 'fs';
import moment from 'moment';
import { PRODUCT_TYPE } from './constants/productType.js';
import { PRODUCT_DATA } from './constants/productData.js';
import { CATEGORIES } from './constants/categories.js';
import { SHIPPING_CLASS } from './constants/shippingClass.js';
import { TAX_CLASS } from './constants/taxClass.js';

const headingColumnNames = [
    "sku",
    "name", 
    "product_type",
    "product_status",
    "categories",
    "short_desc",
    "details_info",
    "shipping_info",
    "deliver_info",
    "featured",
    "attr_display",
    "price",
    "old_price",
    "base_cost",
    "meta_tags_title",
    "meta_tags_description",
    "meta_tags_keywords",
    "shipping_class",
    "tax_class",
    "design_url",
    "variant_image",
    "variant_mockup",
    "variant_title",
    "variant_cost",
    "variant_price",
    "variant_old_price",
    "variant_shipping_class",
    "variant_tax_class",
    "variant_default",
    "variant_product_type",
    "variant_product_title",
    "variant_product_value",
    "variant_size_type",
    "variant_size_title",
    "variant_size_value",
    // 'variant_pack_type',
    // "variant_pack_title",
    // "variant_pack_value"
]

const producstMap = (products) => {
    console.log(products);
    return products.map( product => (variantMap({product: product,variants : product.productVariant})));
}

const variantMap = (obj) =>{
    if(obj.product.productType === PRODUCT_TYPE.CLOTH){
        return obj.variants.map(variant => ({
            "sku" : obj.product.productName,
            "name" : obj.product.productName,
            "product_type" : PRODUCT_DATA.PRODUCT_TYPE,
            "product_status" : PRODUCT_DATA.PRODUCT_STATUS,
            "categories" : CATEGORIES.CLOTHING_3D,
            "short_desc" : "",
            "details_info" : obj.product.productDescripiton,
            "shipping_info" : "",
            "deliver_info" : "",
            "featured" : "",
            "attr_display" : PRODUCT_DATA.ATTR_DISPLAY,
            "price" : obj.product.productPrice.toString(),
            "old_price" : obj.product.productOldPrice.toString(),
            "base_cost" : "",
            "meta_tags_title" : "",
            "meta_tags_description": "",
            "meta_tags_keywords" : "",
            "shipping_class" : SHIPPING_CLASS.CLOTHING_3D,
            "tax_class" : TAX_CLASS.DEFAULT,
            "design_url" : variant.image[0],
            "variant_image" : (variant.image).join(','),
            "variant_mockup" : variant.mockup,
            "variant_title": variant.title,
            "variant_cost": variant.cost.toString(),
            "variant_price": variant.price.toString(),
            "variant_old_price": variant.old_price.toString(),
            "variant_shipping_class" : variant.shipping_class,
            "variant_tax_class" : variant.tax_class,
            "variant_default" : variant.default === true ? '1' : '' ,
            "variant_product_type" :variant.options.product.type ,
            "variant_product_title" : variant.options.product.title,
            "variant_product_value": variant.options.product.value? "" : "",
            "variant_size_type" : variant.options.size.type,
            "variant_size_title" :variant.options.size.title,
            "variant_size_value" : variant.options.size.value? "" : "",
        }));
    }else if(obj.product.productType === PRODUCT_TYPE.MASK){
        return obj.variants.map(variant => ({
            "sku" : obj.product.productName,
            "name" : obj.product.productName,
            "product_type" : PRODUCT_DATA.PRODUCT_TYPE,
            "product_status" : PRODUCT_DATA.PRODUCT_STATUS,
            "categories" : CATEGORIES.FACE_MASK_3D,
            "short_desc" : "",
            "details_info" : obj.product.productDescripiton,
            "shipping_info" : "",
            "deliver_info" : "",
            "featured" : "",
            "attr_display" : PRODUCT_DATA.ATTR_DISPLAY,
            "price" : obj.product.productPrice.toString(),
            "old_price" : obj.product.productOldPrice.toString(),
            "base_cost" : "",
            "meta_tags_title" : "",
            "meta_tags_description": "",
            "meta_tags_keywords" : "",
            "shipping_class" : SHIPPING_CLASS.FACE_MASK_3D,
            "tax_class" : TAX_CLASS.DEFAULT,
            "design_url" : variant.image[0],
            "variant_image" : (variant.image).join(','),
            "variant_mockup" : variant.mockup,
            "variant_title": variant.title,
            "variant_cost": variant.cost.toString(),
            "variant_price": variant.price.toString(),
            "variant_old_price": variant.old_price.toString(),
            "variant_shipping_class" : variant.shipping_class,
            "variant_tax_class" : variant.tax_class,
            "variant_default" : variant.default === true ? '1' : '' ,
            "variant_product_type" :variant.options.product.type ,
            "variant_product_title" : variant.options.product.title,
            "variant_product_value": variant.options.product.value? "" : "",
            "variant_size_type" : variant.options.size.type,
            "variant_size_title" :variant.options.size.title,
            "variant_size_value" : variant.options.size.value? "" : "",
        }));
    }
    else if(obj.product.productType === PRODUCT_TYPE.BLANKET){
        return obj.variants.map(variant => ({
            "sku" : obj.product.productName,
            "name" : obj.product.productName,
            "product_type" : PRODUCT_DATA.PRODUCT_TYPE,
            "product_status" : PRODUCT_DATA.PRODUCT_STATUS,
            "categories" : CATEGORIES.BLANKET,
            "short_desc" : "",
            "details_info" : obj.product.productDescripiton,
            "shipping_info" : "",
            "deliver_info" : "",
            "featured" : "",
            "attr_display" : PRODUCT_DATA.ATTR_DISPLAY,
            "price" : obj.product.productPrice.toString(),
            "old_price" : obj.product.productOldPrice.toString(),
            "base_cost" : "",
            "meta_tags_title" : "",
            "meta_tags_description": "",
            "meta_tags_keywords" : "",
            "shipping_class" : SHIPPING_CLASS.CLOTHING_3D,
            "tax_class" : TAX_CLASS.DEFAULT,
            "design_url" : variant.image[0],
            "variant_image" : (variant.image).join(','),
            "variant_mockup" : variant.mockup,
            "variant_title": variant.title,
            "variant_cost": variant.cost.toString(),
            "variant_price": variant.price.toString(),
            "variant_old_price": variant.old_price.toString(),
            "variant_shipping_class" : variant.shipping_class,
            "variant_tax_class" : variant.tax_class,
            "variant_default" : variant.default === true ? '1' : '' ,
            "variant_product_type" :variant.options.product.type ,
            "variant_product_title" : variant.options.product.title,
            "variant_product_value": variant.options.product.value? "" : "",
            "variant_size_type" : variant.options.size.type,
            "variant_size_title" :variant.options.size.title,
            "variant_size_value" : variant.options.size.value? "" : "",
        }));
    }else if(obj.product.productType === PRODUCT_TYPE.QUILT){
        return obj.variants.map(variant => ({
            "sku" : obj.product.productName,
            "name" : obj.product.productName,
            "product_type" : PRODUCT_DATA.PRODUCT_TYPE,
            "product_status" : PRODUCT_DATA.PRODUCT_STATUS,
            "categories" : CATEGORIES.QUILT,
            "short_desc" : "",
            "details_info" : obj.product.productDescripiton,
            "shipping_info" : "",
            "deliver_info" : "",
            "featured" : "",
            "attr_display" : PRODUCT_DATA.ATTR_DISPLAY,
            "price" : obj.product.productPrice.toString(),
            "old_price" : obj.product.productOldPrice.toString(),
            "base_cost" : "",
            "meta_tags_title" : "",
            "meta_tags_description": "",
            "meta_tags_keywords" : "",
            "shipping_class" : SHIPPING_CLASS.CLOTHING_3D,
            "tax_class" : TAX_CLASS.DEFAULT,
            "design_url" : variant.image[0],
            "variant_image" : (variant.image).join(','),
            "variant_mockup" : variant.mockup,
            "variant_title": variant.title,
            "variant_cost": variant.cost.toString(),
            "variant_price": variant.price.toString(),
            "variant_old_price": variant.old_price.toString(),
            "variant_shipping_class" : variant.shipping_class,
            "variant_tax_class" : variant.tax_class,
            "variant_default" : variant.default === true ? '1' : '' ,
            "variant_product_type" :variant.options.product.type ,
            "variant_product_title" : variant.options.product.title,
            "variant_product_value": variant.options.product.value? "" : "",
            "variant_size_type" : variant.options.size.type,
            "variant_size_title" :variant.options.size.title,
            "variant_size_value" : variant.options.size.value? "" : "",
        }));
    }
   
}
const exportProducts = async (products) => {
    products = producstMap(products);
    // console.log(products);
    // fs.writeFile("./productss.txt", JSON.stringify(products), function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }
    
    //     console.log("The file was saved!");
    // }); 
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Template');
    
    let headingColumnIndex = 1 ;
    headingColumnNames.forEach(heading => {
        ws.cell(1 , headingColumnIndex++)
            .string(heading);
    });
    
    let rowIndex = 2; 
    products.forEach(product => {
        product.forEach(record => {
            let columnIndex = 1 ;
            Object.keys(record).forEach(columnName =>{
                ws.cell(rowIndex, columnIndex++)
                .string(record[columnName])
            });
            rowIndex++;
        })
        
    });
    const filename  = 'products'+moment()+'.xlsx';
    await wb.write(filename);
    return filename; 
}

export {exportProducts};
