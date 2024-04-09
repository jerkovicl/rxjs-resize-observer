import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

export function isElementRef(value: unknown): value is ElementRef {
  return value instanceof ElementRef;
}

export function supportsResizeObserver() {
  return typeof window.ResizeObserver !== 'undefined';
}

export function createResizeObserver(
  observeElement: ElementRef | Element
): Observable<ResizeObserverEntry[]> {
  if (!supportsResizeObserver()) {
    throw new Error('[ResizeObserver is not supported in this browser');
  }

  const obs$ = new Observable<ResizeObserverEntry[]>((subscriber) => {
    const resizeObserver = new ResizeObserver((entries) => {
      subscriber.next(entries);
    });

    resizeObserver.observe(
      isElementRef(observeElement)
        ? observeElement.nativeElement
        : observeElement
    );

    return () => resizeObserver.disconnect();
  });

  return obs$;
}
