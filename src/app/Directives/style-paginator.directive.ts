import {Directive,Host,HostListener,Optional,Renderer2,Self,ViewContainerRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';

@Directive({
  selector: '[appStylePaginator]'
})
export class StylePaginatorDirective {
  @HostListener('page', ['$event'])
  onChange(event: PageEvent) {
      this.initPageRange();
  }

  constructor(
      @Host() @Self() @Optional() private matPag: MatPaginator,
      private vr: ViewContainerRef,
      private ren: Renderer2
  ) {
      setTimeout(() => {
          this.initPageRange();
          const Left = this.ren.createElement('i');
          this.ren.addClass(Left, 'icon-arrow-left');
          this.ren.appendChild(document.querySelector(".mat-paginator-navigation-previous .mat-button-wrapper"),Left);
          const Previous = this.ren.createElement('span');
          this.ren.addClass(Previous, 'Previous');
          const Ptext = this.ren.createText('Previous');
          this.ren.appendChild(Previous, Ptext);
          this.ren.appendChild(document.querySelector(".mat-paginator-navigation-previous .mat-button-wrapper"),Previous);
         
          const Next = this.ren.createElement('span');
          this.ren.addClass(Next, 'Next');
          const text = this.ren.createText('Next');
          this.ren.appendChild(Next, text);
          this.ren.appendChild(document.querySelector(".mat-paginator-navigation-next .mat-button-wrapper"),Next);
          const Right = this.ren.createElement('i');
          this.ren.addClass(Right, 'icon-arrow-right');
          this.ren.appendChild(document.querySelector(".mat-paginator-navigation-next .mat-button-wrapper"),Right);
      }, 0);
     
  }

  private initPageRange(): void {
    
      const pageRange = this.vr.element.nativeElement.querySelector(
          'div.mat-paginator-range-actions > div.mat-paginator-range-label'
      );
      pageRange.innerHTML = '';
      const pageCount = this.pageCount(
          this.matPag.length,
          this.matPag.pageSize
      );
      for (let i = 0; i < pageCount; i++) {
          this.ren.appendChild(
              pageRange,
              this.createPage(i, this.matPag.pageIndex)
          );
      }
      function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    insertAfter(pageRange, document.querySelector(".mat-paginator-navigation-previous"));
    
   // document.querySelector(".mat-paginator-navigation-next .mat-button-wrapper").appendChild('<i class="icon-arrow-right"></i>');
     
  }

  private createPage(i: number, pageIndex: number): any {
      const span = this.ren.createElement('span');
      this.ren.listen(span, 'click', evt => {
          this.switchPage(i);
      });
      const text = this.ren.createText(i + 1 + '');
      this.ren.addClass(span, 'mat-custom-page');
      i === pageIndex
          ? this.ren.addClass(span, 'selected')
          : this.ren.addClass(span, 'unselected');
      this.ren.appendChild(span, text);
      return span;
  }

  private pageCount(length: number, pageSize: number): number {
      return Math.ceil(length / pageSize) ;
  }

  private switchPage(i: number): void {
      this.matPag.pageIndex = i;
     
      this.matPag._changePageSize(this.matPag.pageSize); 
  }
  
}

