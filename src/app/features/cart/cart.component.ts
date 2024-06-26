import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../shared/crudhttp/cart.service';
import { Cart } from '../../shared/modelsdata/Cart';
import { ProductDetailsService } from '../../shared/crudhttp/product-details.service';
import { DetailedProduct } from '../../shared/modelsdata/DetailedProduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

userName = sessionStorage.getItem('userName');
  
  constructor(private ws: CartService,
    private router: Router ){}
  
  cartItem: Cart = new Cart()
  cartList: Cart[] = []
  total: number = 0;

  productsDetails: DetailedProduct = new DetailedProduct()
  productList : DetailedProduct[]=[]


  noitems: boolean = true;
  items:boolean = false;

  denegatedAccess: boolean = true;
  content= false;

  ngOnInit(){
    this.verifyaccess();
    this.ShowCart(this.userName)
  }

  ShowCart(userName: any){
    this.ws.getCart(userName).subscribe({
      next: (data: Cart[]) => {
        this.cartList = data;
        if(this.cartList.length == 0){
          this.noitems = true;
          this.items = false;
        }else{
          this.items= true
          this.noitems= false;
          this.calculateTotal()
        }

      
      },
      error:(err: Response) =>{
        if(this.cartList.length == 0 || err.status == 404){
         this.router.navigate(['/cart'])
          this.noitems = true;
          this.items = false;
        }
      }
    })
  }

  deleteItem(cartid: number){
    this.ws.deleteProductfromCart(cartid).subscribe({
      next: (data:any)=>{

        this.ShowCart(this.userName)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  verifyaccess(){
    if(this.userName != null){
        this.content = true;
        this.denegatedAccess= false;
    }
  }
  toCatalogue(){
    this.router.navigate(['/catalogue']);
  }

  goToProductDetails(id: number){
    this.router.navigate(['/product', id])
  }

  calculateTotal() {
    this.total = this.cartList.reduce((total, item) => total + item.listPrice, 0);
  }


}
