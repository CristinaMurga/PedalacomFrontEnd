import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../shared/crudhttp/admin.service';
import { Product } from '../../shared/modelsdata/product';
import { FormsModule } from '@angular/forms';
import { Category } from '../../shared/modelsdata/Category';
import { Model } from '../../shared/modelsdata/Models';
import { LoginComponent } from '../../core/login/login.component';
import { Customer } from '../../shared/modelsdata/Customer';
import { Errori } from '../../shared/modelsdata/Errori';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule,LoginComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'


})
export class AdminComponent {

  product: Product = new Product()
  productList: Product[] = []

  newProduct: Product = new Product();
  updatedProduct : Product = new Product()

  user: Customer = new Customer()

  errorList: Errori[] = [];

  filteredProductList: Product[] = []; // Add this line
  searchTerm: string = '';

  category: Category= new Category();
  categoryOptions: Category[] = [];

  model: Model = new Model();
  modelOptions: Model[] = [];


  showErrorsLog: boolean = false
  sameName: boolean = false;
  showClseBtn: boolean = false;
  showProducts: boolean = true;
  showCreateform: boolean = false;
  showEditForm: boolean = false;
  showDeleteBox: boolean = false;
  content: boolean = false;
  denegatedAccess: boolean = true;
  successMsg = false;
  errorMsg = false;
  deleteMsg= false;

  productID:number = 0;
  productName: string = '';
  currentEditingProduct: Product | null = null;

  errorBtn: boolean =  true;
  

  constructor(private ws: AdminService, private router: Router) { }

  ngOnInit(){
    
    this.getProducts();
    this.VerifyAdmin();
  }

  VerifyAdmin() {
    this.ws.getAdmin(sessionStorage.getItem('userName')).subscribe({
      next:(data: Customer) => {
        this.user = data
         if(this.user.isOld == 2){
          this.denegatedAccess = false;
          this.content = true;
         }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getProducts() {
    this.ws.getProducts().subscribe({
      next: (data: Product[]) => {
        this.productList = data
        // Initialize the filtered list with all products
        this.filteredProductList = [...this.productList];
     
      },
      error: (err: any) => {
        console.log(err)
      }

    })

  }

  liveSearch() {
    this.deleteMsg = false;
    this.successMsg = false;
    // Filter products based on the entered search term for the name
    this.filteredProductList = this.productList.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  CreateProduct(name: string, colore: string, standarCost: number, listinoPrice: number, misura: string, peso: number,
    categoryId: number, modelId: number){
      if (this.productList.some(product => product.name.toLowerCase() === name.toLowerCase())) {
      this.sameName = true;
        return;
      }

      this.newProduct = {
        productId: 0,
        name: name , 
        productNumber: 'LH3459',
        color : colore, 
        standardCost:standarCost,
        listPrice: listinoPrice, 
        size: misura,
        weight: peso, 
        productCategoryId: categoryId, 
        productModelId: modelId,  
        sellStartDate: new Date(),
        sellEndDate: new Date(),
        discontinuedDate: new Date(),
        thumbNailPhoto: '',
        thumbNailPhotoFileName: '',
        rowguid: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
        modifiedDate: new Date(),
      }
      
    this.ws.addProducts(this.newProduct).subscribe({
      next:(data: Product)=> {
        this.getProducts()
        this.CloseForms();
        this.successMsg = true;
        this.deleteMsg = false;
        this.sameName = false;
      },
      error: (err: any) => {
        console.log(err);
      },
    })

  }

  OpenEditForm(id:number, product: Product) {
    this.productID = id;
    this.product = product
    this.currentEditingProduct = {...product}
    this.deleteMsg = false;
    this.successMsg = false;
    this.showProducts = false;
    this.showEditForm = true;
    this.errorBtn = false;
    this.showErrorsLog= false;
    this.sameName = false;
    console.log(this.productID)
       //Chiamo categories
       this.ws.GetCategories().subscribe({
        next: (data: Category[]) => {
          this.categoryOptions = data;
          
        },
        error: (err: any) => {
          console.log(err)
        }
      })
  
      // chiamo Models
      this.ws.GetModels().subscribe({
        next: (data: Model[]) => {
          this.modelOptions = data;
          console.log(data)
          
        },
        error: (err: any) => {
          console.log(err)
        }
      })
  }

  OpenCreateFrom(){
    this.deleteMsg = false;
    this.showCreateform = true;
    this.showProducts = false
    this.showClseBtn = true;
    this.errorBtn = false;
    this.showErrorsLog= false;
    this.successMsg = false;
    this.sameName = false;

    //Chiamo categories
    this.ws.GetCategories().subscribe({
      next: (data: Category[]) => {
        this.categoryOptions = data;
        
      },
      error: (err: any) => {
        console.log(err)
      }
    })

    // chiamo Models
    this.ws.GetModels().subscribe({
      next: (data: Model[]) => {
        this.modelOptions = data;

        
      },
      error: (err: any) => {
        console.log(err)
      }
    })


  }

  CloseForms(){
    this.showCreateform = false;
    this.showProducts = true;
    this.showClseBtn = false;
    this.showEditForm = false;
    this.showDeleteBox = false;
    this.errorBtn = true;
    this.showErrorsLog= false;
  }

  OpenDeleteBox(id: number, name: string) {
    this.productID = id;
    this.productName = name;
    
    this.errorBtn = false;
    this.showErrorsLog= false;
     this.showDeleteBox = true
     this.showProducts = false; 
     this.deleteMsg = false;
     this.sameName = false;
     this.successMsg = false;

  }

  DeleteProduct(id: number): void {
    this.ws.DeleteProduct(id).subscribe({
      next: (data: any) =>{
        this.getProducts()
        this.CloseForms();
        this.deleteMsg = true;
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  submitEditForm(name: string, color: string, standardCost: number, price: number, size: string, 
    weight: number, category: number, model: number) {

    this.updatedProduct = {
      productId: this.productID,
      name: name,
      productNumber: 'LH3414',
      color: color,
      standardCost: standardCost,
      listPrice: price,
      size: size,
      weight: weight,
      productCategoryId: category,
      productModelId: model,
      sellStartDate: new Date(),
      sellEndDate: new Date(),
      discontinuedDate: new Date(),
      thumbNailPhoto: '',
      thumbNailPhotoFileName: '',
      rowguid: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
      modifiedDate: new Date(),
    }

    this.ws.EditProduct(this.productID, this.updatedProduct).subscribe({
      next: (data: Product) => {
        this.getProducts()
        this.CloseForms();
        this.successMsg = true;
        this.deleteMsg = false;
      }, error: (err: any) => {
        this.errorMsg = true;
        console.log(err)
      },
    })

  }

  getErrors(){
    this.ws.GetErrors().subscribe({
      next:( data: Errori[]) => {
        this.errorList = data;
        this.deleteMsg = false;
       this.showErrorsLog = true
       this.showProducts = false
       this.errorBtn = false;

      },
      error: (err:any) =>{
        console.log(err)
      }
    })
  }

  goToProductDetails(id: number){
    this.router.navigate(['/product', id])
  }

}
