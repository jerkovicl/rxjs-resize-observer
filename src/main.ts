import { Component, inject, ElementRef } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { createResizeObserver } from './create-resize-observer';

@Component({
  selector: 'app-resize-demo',
  template: `Resize me and watch the console`,
  styles: [
    `
    :host{
      display: block;
      width: 300px;
      height: 200px;
      resize: both;
      overflow: auto;
      border: 1px dashed black;
    }
  `,
  ],
  standalone: true,
  imports: [],
})
export class ResizeDemoComponent {
  elRef = inject(ElementRef);
  resizeObservable$ = createResizeObserver(this.elRef);
  constructor() {
    this.resizeObservable$
      .pipe()
      .subscribe((x) => console.log('From Rxjs wrapped ResizeObserver', x));
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ResizeDemoComponent],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
    <app-resize-demo/>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
