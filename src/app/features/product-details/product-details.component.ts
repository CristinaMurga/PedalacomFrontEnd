import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProductDetailsService } from '../../shared/crudhttp/product-details.service';
import { DetailedProduct } from '../../shared/modelsdata/DetailedProduct';



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

  showColor = false;
  productColor: string = '';

  showSize = false;

  showWeight = false;

  showPrice = false;

  showDescription = false;

  constructor(private route: ActivatedRoute, private ws: ProductDetailsService) { }
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

      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  retornarColor() {
    return this.productColor;
  }

}
