import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProductDetailsService } from '../../shared/crudhttp/product-details.service';
import { DetailedProduct } from '../../shared/modelsdata/DetailedProduct';
import { CatalogueService } from '../../shared/crudhttp/catalogue.service';
import { ProductImage } from '../../shared/modelsdata/ProductImage';
import { CartService } from '../../shared/crudhttp/cart.service';
import { Cart } from '../../shared/modelsdata/Cart';




@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productId = 0;
  productDescription: DetailedProduct = new DetailedProduct()

  prodImg: ProductImage = new ProductImage();
  showColor = false;
  productColor: string = '';

  defaultImg = '../../../assets/media/fotoCard.jpg'
  showSize = false;

  showWeight = false;

  showPrice = false;

  showDescription = false;

  prodtoCart: Cart = new Cart();
  username = sessionStorage.getItem('userName');

  successMsg = false;

  constructor(private route: ActivatedRoute, private ws: ProductDetailsService, 
    private ws2: CatalogueService, private cart: CartService, private router: Router ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      console.log('sono el detaglio prodotto il mio id è', this.productId);
    })

    this.getProductDetails(this.productId);
  }

  getProductDetails(productID: number) {
    this.ws.getProductDetails(productID).subscribe({
      next: (data: DetailedProduct) => {
        this.productDescription = data;
        console.log(data);
        if(data.color != null){
          this.showColor = true
          this.productColor = this.productDescription.color.toLowerCase();
        }
        if(data.size != null || data.size == ''){
          this.showSize = true;
        }
        if(data.weight != null || data.weight == ''){
          this.showWeight = true
        } 
      
        if(data.description != null || data.description== ''){
          this.showDescription = true
        }
        
        this.getImages(this.productDescription.productID, this.productDescription)

      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  retornarColor() {
    return this.productColor;
  }


  
  getImages(productId: number, prod: DetailedProduct): void {
    this.ws2.getImages(productId).subscribe({
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
        } else {
          console.log('No images available');
        }
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  AddCart(productId: number, name: string, price: number) {
    if(this.username == null){
      this.router.navigate(['/log-in']);
      return
    }
 
    this.prodtoCart = {
      cartID: 0,
      emailAddress: this.username,
      productID: productId,
      name: name,
      listPrice: price,
      thumbNailPhoto: '',
      thumbNailPhotoFileName: 'no_image_available_small.gif'
    }
    this.cart.addProduct(this.prodtoCart).subscribe({
      next: (data: Cart) => {
        this.successMsg= true;
      },
      error: (err: any) => {
   
    
      }

    })
  }

}
