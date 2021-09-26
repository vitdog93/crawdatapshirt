import { TAX_CLASS } from './constants/taxClass.js';
import { SHIPPING_CLASS } from './constants/shippingClass.js';
import { VARIANT_OPTIONS } from './constants/variantOptions.js';
import {getVariantsImages,getProductOldPrice, getVariantMockup} from './productutil.js';
import { MOCKUPS } from './constants/mockups.js';
import { PRODUCT_TYPE } from './constants/productType.js';


export const getProductType = (attributes) => {
    let productType = null; 
    if(attributes.length < 2){
        productType = PRODUCT_TYPE.BLANKET;
    }else if( Object.keys(attributes).find(key => attributes[key].slug === 'pack')){
        productType = PRODUCT_TYPE.MASK;
    }else if(Object.keys(attributes).find(key => attributes[key].slug === 'product-type')){
        productType = PRODUCT_TYPE.QUILT;
    }else{
        productType = PRODUCT_TYPE.CLOTH;
    }
    return productType;
};

export const getVariantByType = (obj) => {
    const productType = getProductType(obj.attributes);
    const prefix = obj.prefix;
    let variants = obj.variants;
    switch (productType) {
        case PRODUCT_TYPE.BLANKET:
            variants = variantsBlanket(variants, prefix);
            break;
        case PRODUCT_TYPE.QUILT:
            variants = variantsQuilt(variants, prefix);
            break;
        case PRODUCT_TYPE.MASK:
            variants = variantsMask(variants, prefix);
            break;
        case PRODUCT_TYPE.CLOTH:
            variants = variants3dClothing(variants, prefix);
    }
    return {variants: variants, productType: productType};
}

export const variants3dClothing = (variants, prefix) => {
    const productVariants = variants.map(variant => ({
        _id: variant._id,
        image: getVariantsImages({prefix: prefix,slug: variant.options[(variant.options).findIndex(x => x.is_preselected === true)]?.slug,sides: variant.sides}),
        mockup : getVariantMockup(variant.options[VARIANT_OPTIONS.PRODUCT_TITLE_3D_CLOTH].slug),
        sku : variant.sku,
        title : variant.title,
        cost : variant.retail_price,
        price : variant.retail_price,
        old_price : getProductOldPrice(variant.retail_price),
        shipping_class : SHIPPING_CLASS.CLOTHING_3D,
        tax_class : TAX_CLASS.DEFAULT,
        default : variant.is_default,
        options: {
            product: {
                type : VARIANT_OPTIONS.PRODUCT_TYPE,
                title: variant.options[VARIANT_OPTIONS.PRODUCT_TITLE_3D_CLOTH].name,
                value: null,
            },
            size : {
                type : VARIANT_OPTIONS.SIZE_TYPE,
                title: variant.options[VARIANT_OPTIONS.SIZE_TITLE_3D_CLOTH].name,
                value : 0,
            }
        }
    }));
    return productVariants;
}

const variantsQuilt = (variants, prefix) => {
    const productVariants = variants.map(variant => ({
        _id: variant._id,
        image: getVariantsImages({prefix: prefix,sides: variant.sides}),
        mockup : MOCKUPS.QUILT ,
        sku : variant.sku,
        title : variant.title,
        cost : variant.retail_price,
        price : variant.retail_price,
        old_price :getProductOldPrice(variant.retail_price),
        shipping_class : SHIPPING_CLASS.CLOTHING_3D,
        tax_class : TAX_CLASS.DEFAULT,
        default : variant.is_default,
        options: {
            product: {
                type : VARIANT_OPTIONS.PRODUCT_TYPE,
                title: variant.options[VARIANT_OPTIONS.PRODUCT_TITLE_QUILT].name,
                value: null,
            },
            size : {
                type : VARIANT_OPTIONS.SIZE_TYPE,
                title: variant.options[VARIANT_OPTIONS.SIZE_TITLE_QUILT].name,
                value : 0,
            }
        }
    }));
    return productVariants;
}

const variantsBlanket = (variants, prefix) => {
    const productVariants = variants.map(variant => ({
        _id: variant._id,
        image: getVariantsImages({prefix: prefix,sides: variant.sides}),
        mockup : MOCKUPS.BLANKET,
        sku : variant.sku,
        title : variant.title,
        cost : variant.retail_price,
        price : variant.retail_price,
        old_price :getProductOldPrice(variant.retail_price),
        shipping_class : SHIPPING_CLASS.CLOTHING_3D,
        tax_class : TAX_CLASS.DEFAULT,
        default : variant.is_default,
        options: {
            product: {
                type : VARIANT_OPTIONS.PRODUCT_TYPE,
                title: VARIANT_OPTIONS.PRODUCT_TITLE_BLANKET,
                value: null,
            },
            size : {
                type : VARIANT_OPTIONS.SIZE_TYPE,
                title: variant.options[VARIANT_OPTIONS.SIZE_TITLE_BLANKET].name,
                value : 0,
            }
        }
    }));
    return productVariants;
}

const variantsMask = (variants, prefix) => {
    const productVariants = variants.map(variant => ({
        _id: variant._id,
        image: getVariantsImages({prefix: prefix,sides: variant.sides}),
        mockup : MOCKUPS.FACE_MASK_3D,
        sku : variant.sku,
        title : variant.title,
        cost : variant.retail_price,
        price : variant.retail_price,
        old_price :getProductOldPrice(variant.retail_price),
        shipping_class : SHIPPING_CLASS.FACE_MASK_3D,
        tax_class : TAX_CLASS.DEFAULT,
        default : variant.is_default,
        options: {
            product: {
                type : VARIANT_OPTIONS.PRODUCT_TYPE,
                title: VARIANT_OPTIONS.PRODUCT_TITLE_MASK,
                value: null,
            },
            size : {
                type : VARIANT_OPTIONS.SIZE_TYPE,
                title: variant.options[VARIANT_OPTIONS.SIZE_TITLE_MASK].name,
                value : 0,
            }
        }
    }));
    return productVariants;
}