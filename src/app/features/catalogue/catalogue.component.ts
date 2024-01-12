import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueService } from '../../shared/crudhttp/catalogue.service';
import { CategoryParent } from '../../shared/modelsdata/CategoryParent';
import { CategoryChild } from '../../shared/modelsdata/CategoryChild';
import { PreviewProduct} from '../../shared/modelsdata/PreviewProduct'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../shared/modelsdata/product';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'catalogue.component.html',
  styleUrl: './catalogue.component.css',
  providers: [CatalogueService]
 
})
export class CatalogueComponent {
  categoryParent: CategoryParent = new CategoryParent();
  categoryParentsList: CategoryParent[] = [];

  categoryChild: CategoryChild = new CategoryChild();
  categoryChildList: CategoryChild[] = []
  categoryName: string= ''

  
  previewProductsList: PreviewProduct[] = []

  allproductsList: Product[]= [];
  filteredProductList: Product[] = []; 
  searchTerm: string = '';

  noProducts: boolean = false;
  showAllProducts: boolean = true;
  showCategoriesChild: boolean = false;
  showProducts:boolean = false;
  foundProducts: boolean = true;


  constructor(private ws: CatalogueService, private router: Router ) { }


  //Codice relativo a category Parent
  ngOnInit(){
    this.getCategoryParent()
    this.getProducts();
    
  }

  getCategoryParent() {
    this.ws.getCategoryParent().subscribe({
      next: (data: CategoryParent[]) => {
        this.categoryParentsList = data;
       
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  //Codice relativo a category child
  getCategoryChilds(productCategoryID: number){
    this.ws.getCategoryChilds(productCategoryID).subscribe({
      next: (data: CategoryChild[]) => {
        console.log(data);
        this.categoryChildList = data;
        this.showCategoriesChild = true;
        console.log(this.showCategoriesChild)
      
        
  
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  showHideCategoriesChild(){

    this.showCategoriesChild = !this.showCategoriesChild;
  }

  //Codice relativo a Previewed Products

  getPreviewProducts(productCategoryID:number, categoryName: string){

    this.categoryName = categoryName;
    this.ws.getPreviewProducts(productCategoryID).subscribe({
      next: (data: PreviewProduct[]) => {
       
        this.previewProductsList = data;
        this.showAllProducts = false;
        this.showProducts = true
      }
    })
  }


  liveSearch() {
    // Filter products based on the entered search term for the name
    this.filteredProductList = this.allproductsList.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if(this.filteredProductList.length == 0){
      this.noProducts = true;
      this.foundProducts = false;
    }else {
      this.noProducts = false;
      this.foundProducts = true;
    }
  }

  goToProductDetails(id: number){
    this.router.navigate(['/product', id])
  }

  getProducts() {
    this.ws.getProducts().subscribe({
        next: (data: Product[]) => {
          this.allproductsList = data;
          // Initialize the filtered list with all products
          this.filteredProductList = [...this.allproductsList];
        },
      error: (err: any) => {
        console.log(err)
      }

    })

  }

  allProducts(){
    this.showAllProducts = true;
    this.showProducts = false;
    this.showCategoriesChild = false;
  }

}
