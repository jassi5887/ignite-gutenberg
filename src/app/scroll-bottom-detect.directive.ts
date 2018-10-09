import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appScrollBottomDetect]'
})
export class ScrollBottomDetectDirective {
  @Output() endReached = new EventEmitter<any>();
  @Input('appScrollBottomDetect') reset = false;

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    let pointer = event.target;
    let bottom = pointer.scrollHeight - pointer.clientHeight;
    if (event.target.scrollTop === bottom && !this.reset) {
      console.log("Bottom reached");
      this.endReached.emit();
    } else if(this.reset) {
      event.target.scrollTop = 0;
      this.reset = false;
    }
  }

  constructor() { }

}
