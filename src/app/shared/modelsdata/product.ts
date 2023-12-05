export class Product {

    productID = 0;
    name: string = ''; 
    productNumber = ''; 
    color = ''; 
    standardCost = 0; 
    listPrice = 0; 
    size = '';
    weight = 0; 
    productCategoryID= 0; 
    productModelID = 0; 
    sellStartDate: Date = new Date();
    sellEndDate: Date = new Date();
    discontinuedDate: Date = new Date();
    thumbNailPhoto: string = "";
    thumbNailPhotoFileName: string= "";
    rowguid = '';
    modifiedDate: Date = new Date();
}
