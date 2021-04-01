import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSusbs: Subscription;

  constructor() {

    // this.getObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   (valor) => console.log(valor),
    //   (err) => console.warn(err),
    //   () => console.info("Complete")
    // );

    this.intervalSusbs = this.getInterval().subscribe(console.log);


  }
  ngOnDestroy(): void {
    this.intervalSusbs.unsubscribe();
  }

  getInterval(): Observable<number> {
    return interval(100).pipe(
      // take(10),
      map(valor => {
        return valor + 1;
      }),
      filter(
        valor => valor % 2 == 0 ? true : false
      ),
    );
  }

  getObservable(): Observable<number> {
    let i = 0;
    const obs$ = new Observable<number>(observer => {

      const intervalo = setInterval(() => {

        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i == 2) {
          observer.error("Error");
        }

      }, 1000)
    });

    return obs$;
  }

}
