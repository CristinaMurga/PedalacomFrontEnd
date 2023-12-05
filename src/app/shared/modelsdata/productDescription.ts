import { ModelIDdescID } from "./modelIDdescID";

export class ProductDescription {

    productDescriptionId = 0;

    description = '';

    rowguid = '';

    modifiedDate: Date = new Date();

    productModelProductDescriptions: ModelIDdescID[] = []
}