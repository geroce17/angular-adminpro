import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() labels: Label[] = [];
  @Input() data: MultiDataSet = [];
  @Input() title: string = "Sin titulo";

  public colors: Color[] = [
    {backgroundColor: ['#3D4FFF', '#FF5800', '#FFB414']}
  ];

}
