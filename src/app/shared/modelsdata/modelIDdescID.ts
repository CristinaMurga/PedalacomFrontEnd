import { ProductDescription } from "./productDescription";
import { ProductModel } from "./productModel";

export class ModelIDdescID {


  productModelId = 0;

  productDescriptionId = 0;

  culture = '';

  rowguid = '';

  modifiedDate: Date = new Date();

  productModel: ProductModel[] = [];

  productDescription: ProductDescription[] = []
}