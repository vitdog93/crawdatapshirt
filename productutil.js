import { MOCKUPS , SLUG } from "./constants/mockups.js";

export const getProductIdFromImage = (url)=>{
    var indexOfProd = url.lastIndexOf('products/');
    var sliceProd = url.slice( indexOfProd + 9 );
    var indexofSlash = sliceProd.indexOf('/');
    var id = sliceProd.substring(0,indexofSlash); 
    return id;
}

export  const getProductVarianstUrl = (id) =>{
    let baseUrl = `https://piaceshirt.com/api/product/products/${id}/options`;
    return baseUrl;
}

export const getVariantsImages = (obj) => {
    // var baseUrl = `https://d2dytk4tvgwhb4.cloudfront.net/k6yn34zm/products/60e700eee36b1e39f4012efa/3d-hoodie/KCOgowtLBf/regular.jpg`;
    var images = [];
    var sides = obj.sides;
    if(obj.slug){
        sides.forEach((e,i) => {
            let url = `${obj.prefix}${obj.slug}/${e}/regular.jpg`;
            images.push(url);
        });
    }else{
        sides.forEach((e,i) => {
            let url = `${obj.prefix}/${e}/regular.jpg`;
            images.push(url);
        });
    }
    return images;
    
}
export const getProductOldPrice = (price) => {
    var oldPrice = parseFloat((price / 0.7).toFixed(2));
    return oldPrice;
};

export const getVariantMockup = (optionSlug) => {
    let mockup = null; 
    let oslug = optionSlug.toLowerCase().trim();
    switch (oslug) {
        case  SLUG.HODDIE_3D:
            mockup = MOCKUPS.HODDIE_3D;
            break;
        case  SLUG.TSHIRT_3D:
            mockup = MOCKUPS.TSHIRT_3D;
            break;
        case  SLUG.ZIPPER_HOODIE_3D:
            mockup = MOCKUPS.ZIPPER_HOODIE_3D;
            break;
        case  SLUG.SWEAT_SHIRT_3D:
            mockup = MOCKUPS.SWEAT_SHIRT_3D;
            break;
        case  SLUG.FLEECE_ZIPPER_3D:
            mockup = MOCKUPS.FLEECE_ZIPPER_3D;
            break;
        case  SLUG.BOMBER_3D:
            mockup = MOCKUPS.BOMBER_3D;
            break;
        case  SLUG.SWEATER_3D:
            mockup = MOCKUPS.SWEATER_3D;
            break;
        case  SLUG.POLO_SHIRT_3D:
            mockup = MOCKUPS.POLO_SHIRT_3D;
            break;
        case  SLUG.HAWAIIAN_SHIRT_3D:
            mockup = MOCKUPS.HAWAIIAN_SHIRT_3D;
            break;
        default : 
            mockup = null;
    }
    return mockup;
};