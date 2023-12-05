import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueService } from '../../shared/crudhttp/catalogue.service';
import { CategoryParent } from '../../shared/modelsdata/CategoryParent';
import { CategoryChild } from '../../shared/modelsdata/CategoryChild';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'catalogue.component.html',
  styleUrl: './catalogue.component.css',
  providers: [CatalogueService]
 
})
export class CatalogueComponent {
  categoryParent: CategoryParent = new CategoryParent();
  categoryParentsList: CategoryParent[] = [];

  categoryChild: CategoryChild = new CategoryChild();
  categoryChildList: CategoryChild[] = []

  showCategoriesChild: boolean = false;

  constructor(private ws: CatalogueService) { }

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

  getCategoryChilds(productCategoryID: number){
    this.ws.getCategoryChilds(productCategoryID).subscribe({
      next: (data: any) => {
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

}
