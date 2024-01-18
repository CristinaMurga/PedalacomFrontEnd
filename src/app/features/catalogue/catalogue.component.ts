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
  categoryName: string= ''

  
  previewProductsList: PreviewProduct[] = []

  allproductsList: PreviewProduct[]= [];
  filteredProductList: PreviewProduct[] = []; 
  searchTerm: string = '';

  defaultImg = '../../../assets/media/fotoCard.jpg'
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
        this.categoryChildList = data;
        this.showCategoriesChild = true;
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  showHideCategoriesChild(){

    this.showCategoriesChild = !this.showCategoriesChild;
  }

  //Codice relativo a Previewed Products che otteniamo da category child id

  getPreviewProducts(productCategoryID:number, categoryName: string){

    this.categoryName = categoryName;
    this.ws.getPreviewProducts(productCategoryID).subscribe({
      next: (data: PreviewProduct[]) => {
        this.previewProductsList = data;
      this.previewProductsList.forEach(prod => {
       this.getImages(prod.productId, prod)
        
      });
      this.noProducts= false;
        this.showAllProducts = false;
        this.showProducts = true
      },
      error:(err: any) =>
      {
        console.log(err);
      }    
    })
  }

  getImages(productId: number, prod: any): void {
    this.ws.getImages(productId).subscribe({
      next: (imagesArray: any[]) => {
        if (imagesArray.length > 0) {
          const firstImage = imagesArray[0];
          if (firstImage.thumbnailPhotoFileName === 'no_image_available_small.gif' 
          || firstImage.thumbnailPhotoFileName === null || firstImage.thumbnailPhotoFileName ==='') {
            prod.base64Image = this.defaultImg;
          } else {
            const base64Image = `data:image/png;base64,${firstImage.thumbNailPhoto}`;
            prod.base64Image = base64Image;
          }
        } 
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  liveSearch() {
    // Filter products based on the entered search term for the name
    this.filteredProductList = this.allproductsList.filter(product =>
      product.product.toLowerCase().includes(this.searchTerm.toLowerCase())
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
 // preview di tutti i prodotti
   getProducts() {
    this.ws.getProducts().subscribe({
        next: (data: PreviewProduct[]) => {
          this.allproductsList = data;
          // Initialize the filtered list with all products
          this.filteredProductList = [...this.allproductsList];
          this.filteredProductList.forEach(prod => {
            this.getImages(prod.productId, prod)
           });
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
