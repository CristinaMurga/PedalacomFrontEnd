import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../shared/crudhttp/product.service';
import { Product } from '../../shared/modelsdata/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [ProductService],
})

export class ProductsComponent {

  prod: Product = new Product();
  prodList: Product[]= [];

  constructor(private sw: ProductService){
   
  };
  ngOnInit() {
    this.getProductsFromService();
  }

  
 
  getProductsFromService() {
    this.sw.getallProducts().subscribe({
      next:(data:Product[]) => {
        this.prodList = data;
        console.log(data)
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }

}
