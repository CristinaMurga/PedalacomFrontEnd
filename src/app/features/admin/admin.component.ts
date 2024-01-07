import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../shared/crudhttp/admin.service';
import { Product } from '../../shared/modelsdata/product';
import { FormsModule } from '@angular/forms';
import { Category } from '../../shared/modelsdata/Category';
import { Model } from '../../shared/modelsdata/Models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'


})
export class AdminComponent {

  product: Product = new Product()
  productList: Product[] = []

  newProduct: Product = new Product();
  updatedProduct : Product = new Product()



  filteredProductList: Product[] = []; // Add this line
  searchTerm: string = '';

  category: Category= new Category();
  categoryOptions: Category[] = [];

  model: Model = new Model();
  modelOptions: Model[] = [];

  sameName: boolean = false;
  showClseBtn: boolean = false;
  showProducts: boolean = true;
  showCreateform: boolean = false;
  showEditForm: boolean = false;
  showDeleteBox: boolean = false;

  productID:number = 0;

  constructor(private ws: AdminService) { }

  ngOnInit(){
    this.getProducts();
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
    // Filter products based on the entered search term for the name
    this.filteredProductList = this.productList.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  CreateProduct(name: string, colore: string, standarCost: number, listinoPrice: number, misura: string, peso: number,
    categoryId: number, modelId: number){
      console.log(this.productList)
      if (this.productList.some(product => product.name.toLowerCase() === name.toLowerCase())) {
        console.log('Error: Product with the same name already exists');
        return;
      }

      console.log('categoria' , categoryId)
      console.log('modello' , modelId)
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
      console.log(this.newProduct);
      
    this.ws.addProducts(this.newProduct).subscribe({
      next:(data: Product)=> {
        console.log(data);
        console.log('Inserimento Prodotto, avvenuto con successo!');
      },
      error: (err: any) => {
        console.log(err);
      },
    })

  }

  OpenEditForm(id:number, product: Product) {
    this.productID = id;
    this.product = product
    this.showProducts = false;
    this.showEditForm = true;
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
    this.showCreateform = true;
    this.showProducts = false
    this.showClseBtn = true;

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

  CloseForms(){
    this.showCreateform = false;
    this.showProducts = true;
    this.showClseBtn = false;
    this.showEditForm = false;
    this.showDeleteBox = false;
  }

  OpenDeleteBox(id: number) {
     this.showDeleteBox = true
     this.showProducts = false; 
  }

  DeleteProduct(id: number): void {
    this.ws.DeleteProduct(id).subscribe({
      next: (data: any) =>{
        console.log('Delete succesfully');
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  // EditProduct(name: string, colore: string, standarCost: number, listinoPrice: number, misura: string, peso: number,
  //   categoryId: number, modelId: number){
     

  //     this.updatedProduct = {
  //       productId: this.productID,
  //       name: name , 
  //       productNumber: 'LH3459',
  //       color : colore, 
  //       standardCost:standarCost,
  //       listPrice: listinoPrice, 
  //       size: misura,
  //       weight: peso, 
  //       productCategoryId: categoryId, 
  //       productModelId: modelId,  
  //       sellStartDate: new Date(),
  //       sellEndDate: new Date(),
  //       discontinuedDate: new Date(),
  //       thumbNailPhoto: '',
  //       thumbNailPhotoFileName: '',
  //       rowguid: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
  //       modifiedDate: new Date(),
  //     }
      
  //   this.ws.EditProduct(this.productID, this.updatedProduct).subscribe({
  //     next: (data: Product) => {
  //       console.log('Edit success')
  //     },
  //     error: (err: any) => {
  //       console.error(err);
        
  //     }
  //   })
  // }

  submitEditForm(name: string, color: string, standardCost: number, price: number, size: string, weight: number, category: number, model: number) {
    this.updatedProduct = {
      productId: this.productID,
      name: name,
      productNumber: 'LH3410',
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
        console.log(data);
        console.log('Product updated successfully');
      }, error: (err: any) => {
        console.log('Error creating product:', err);
        if (err.error && err.error.errors) {
          console.log('Validation errors:', err.error.errors);
        } else {
          console.log('Unexpected error:', err);
        }
      },

    })

  }

}
