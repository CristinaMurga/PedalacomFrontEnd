import { ModelIDdescID } from "./modelIDdescID";
import { Product } from "./product";

export class ProductModel {
    
    productModelId = 0;

    name = '';
    
    catalogDescription = '';

    rowguid = '';

    modifiedDate:  Date = new Date();

    productModelProductDescriptions: ModelIDdescID[] = [];

    
    products: Product[] = []

    
  
}