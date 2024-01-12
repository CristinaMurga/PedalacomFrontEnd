import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'] 
})
export class FooterComponent {
  constructor(private elementRef: ElementRef, private app : AppComponent) {}
  title = 'Pedalacom_Front';
  navbar: any;
  main: any;
  footer: any;



  ngOnInit() {
    this.navbar = document.querySelector("#navbar");
    this.main = document.querySelector("#main");
    this.footer = this.elementRef.nativeElement.querySelector("#footer");

    this.setmainHeight();
  }

  @HostListener('window:resize')
  onResize() {
    this.setmainHeight();
  }

  setmainHeight() {
    if (this.main.clientHeight + this.navbar.clientHeight + this.footer.clientHeight < window.innerHeight) {
        this.main.style.height = "100vh";
    }
  }

}
