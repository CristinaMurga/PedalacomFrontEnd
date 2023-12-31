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
  productColor: string = '';
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
        this.productColor = this.productDescription.color.toLowerCase();
        console.log('Color producto:' , this.productColor)

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
