import { Directive , HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[lcDropdown1]'
})
export class DropdownDirective1 {

   private clickCount = true;
  @HostBinding('class.open') get opened(){
    return this.isOpen;
  }
  @HostListener ('click') open(){
      if(this.clickCount == true )
       {
            this.isOpen = true;
            this.clickCount = false ;
       }
       else
       {
                this.isOpen = false;
                this.clickCount = true ;

       }
  }
  private isOpen = false;
}