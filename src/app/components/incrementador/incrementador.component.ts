import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input('valor') progreso: number = 50;
  @Input() btnClass: string = 'btn-primary';
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  cambiarValor(valor: number){
    this.progreso = this.progreso + valor;

    if(this.progreso > 100){
      this.progreso = 100;
      return this.valorSalida.emit(this.progreso);
    }

    if(this.progreso < 0){
      this.progreso = 0;
      return this.valorSalida.emit(this.progreso);
    }

    return this.valorSalida.emit(this.progreso);
  }

  onChange(valor){
    if(valor > 100){
      this.progreso = 100;
      return this.valorSalida.emit(this.progreso);
    }

    if(valor < 0){
      this.progreso = 0;
      return this.valorSalida.emit(this.progreso);
    }

    this.progreso = valor;
    this.valorSalida.emit(valor);
  }

}
