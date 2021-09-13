import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[hover-class]',
})
export class HoverClassDirective {
  existe = false;
  constructor(public elementRef: ElementRef) {}
  @Input('hover-class') hoverClass: any;

  @HostListener('mouseenter') onMouseEnter() {
    if (this.elementRef.nativeElement.classList.contains(this.hoverClass)) {
      this.existe = true;
      return;
    }
    this.elementRef.nativeElement.classList.add(this.hoverClass);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.existe) {
      this.existe = false;
      return;
    }
    this.elementRef.nativeElement.classList.remove(this.hoverClass);
  }
}
