export class SalesOrderHeader{

    salesOrderId: number = 0;
    revisionNumber:any;
    orderDate: Date = new Date();
    dueDate: Date = new Date(); 
    shipDate: Date = new Date(); 
    status: any;
    onlineOrderFlag: boolean = false;
    salesOrderNumber:string = '';
    purchaseOrderNumber:string = '';
    accountNumber: string = '';
    customerId: number= 0;
    shipToAddressId: number= 0;
    billToAddressId: number = 0;
    shipMethod: string = '';
    creditCardApprovalCode: string = '';
    subTotal: number= 0;
    taxAmt: number= 0;
    freight: number= 0;
    totalDue: number= 0;
    comment: string = '';
    rowguid = '';
    modifiedDate: Date = new Date();
}


   
     
  






