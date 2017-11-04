import { GridsterModule, GridsterOptions } from 'angular2gridster';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gridster',
  templateUrl: './gridster.component.html',
  styleUrls: ['./gridster.component.css']
})
export class GridsterComponent implements OnInit {
  
  gridsterOptions:any = {
        lanes: 5,
        
        direction: 'vertical',

        dragAndDrop: true
    };
    title:string = 'Angular2Gridster';
    widgets:any = [
        {
            x: 0, y: 0, w: 1, h: 2,
            title: 'Basic form inputs 1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            class: 'svg1'
        },
        {
            x: 1, y: 0, w: 2, h: 1,
            title: 'Basic form inputs 2',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            class: 'svg2'
        },
        {
            x: 1, y: 1, w: 2, h: 1,
            title: 'Basic form inputs 3',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            class: 'svg3'
        },
        {
            x: 3, y: 0, w: 1, h: 2,
            title: 'Basic form inputs 4',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            class: 'svg4'
        }
    ];

    removeLine(gridster) {
        gridster.setOption('lanes', --this.gridsterOptions.lanes)
            .reload();
    }
    addLine(gridster) {
        gridster.setOption('lanes', ++this.gridsterOptions.lanes)
            .reload();
    }
    setWidth(widget:any, size:number, e:MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        if(size<1) {
            size = 1;
        }
        widget.w = size;

        return false;
    }

    setHeight(widget:any, size:number, e:MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        if(size<1) {
            size = 1;
        }
        widget.h = size;

        return false;
    }

  constructor() { }

  ngOnInit() {
  }

}
