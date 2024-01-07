import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueService } from '../../shared/crudhttp/catalogue.service';
import { CategoryParent } from '../../shared/modelsdata/CategoryParent';
import { CategoryChild } from '../../shared/modelsdata/CategoryChild';
import { PreviewProduct} from '../../shared/modelsdata/PreviewProduct'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  
  previewProductsList: PreviewProduct[] = []

  filteredProductList: PreviewProduct[] = []; 
  searchTerm: string = '';

  showCategoriesChild: boolean = false;
  showProducts:boolean = false;


  constructor(private ws: CatalogueService, private router: Router ) { }


  //Codice relativo a category Parent
  ngOnInit(){
    this.getCategoryParent()
    
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

  getPreviewProducts(productCategoryID:number){
    this.ws.getPreviewProducts(productCategoryID).subscribe({
      next: (data: PreviewProduct[]) => {
       
        this.previewProductsList = data;
        this.filteredProductList = [...this.previewProductsList];
        this.showProducts = true
      }
    })
  }

  liveSearch() {
    // Filter products based on the entered search term for the name
    this.filteredProductList = this.previewProductsList.filter(product =>
      product.product.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    
  }

  goToProductDetails(id: number){
    this.router.navigate(['/product', id])
  }


}
