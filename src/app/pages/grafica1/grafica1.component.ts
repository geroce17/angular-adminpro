import { Component } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  
  title="Ventas";
  public labels1: Label[] = ['Label 1', 'Label 2', 'label 3'];
  public data1: MultiDataSet = [
    [350, 450, 100],
  ];

}
