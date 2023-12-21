export class Customer{

    customerID: number = 0;
    nameStyle:boolean= true;
    title: string = '';
    firstName: string = '';
    middleName: string = '';
    lastName: string =  '';
    suffix: string = '';
    companyName: string= '';
    salesPerson: string= '';
    emailAddress: string= '';
    phone: string = '';
    passwordHash: string = '';
    passwordSalt: string = '';
    rowguid = '';
    tmpPassword:string = ''
    modifiedDate: Date = new Date();
    isOld = 0;
}

