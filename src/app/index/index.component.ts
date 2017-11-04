import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GridsterModule, GridsterOptions } from 'angular2gridster';

import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as d3Zoom from 'd3-zoom';
import * as d3Brush from 'd3-brush';
import * as d3TimeFormat from 'd3-time-format';
import 'svg-builder';

import { Stocks } from './../shared/data';
import { sp500 } from './../shared/sp500';

export interface Margin {
    top2: number;
    right2: number;
    bottom2: number;
    left2: number;
}

export interface Stock2 {
  date: Date;
  price: number;
}

export interface IGridsterOptions {
    direction?: string;
    lanes?: number;
    widthHeightRatio?: number;
    heightToFontSizeRatio?: number;
    dragAndDrop?: boolean;
    itemSelector?: string;
    resizable?: boolean;
    shrink?: boolean;
    floating?: boolean;
    responsiveView?: boolean;
    responsiveDebounce?: number;
    breakpoint?: string;
    minWidth?: number;
    useCSSTransforms?: boolean;
    cellHeight?: number;
    cellWidth?: number;
    responsiveOptions?: Array<IGridsterOptions>;
}


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    gridsterOptions: IGridsterOptions = {
        lanes: 2,
        direction: 'vertical',
        floating: true,
        dragAndDrop: true,
        resizable: true,
        widthHeightRatio: 1,
        shrink: true,
        useCSSTransforms: true,
        responsiveView: true,
        responsiveDebounce: 500,
        responsiveOptions: [
            {
                breakpoint: 'sm',
                // minWidth: 480,
                lanes: 3
            },
            {
                breakpoint: 'md',
                minWidth: 768,
                lanes: 4
            },
            {
                breakpoint: 'lg',
                minWidth: 1250,
                lanes: 6
            },
            {
                breakpoint: 'xl',
                minWidth: 1800,
                lanes: 8
            }
        ]
    };

    title:string = 'Angular2Gridster';
    widgets: Array<any> = [
        {
            x: 2, y: 2, w: 2, h: 2,
            dragAndDrop: true,
            resizable: true,
            title: 'Basic form inputs 1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
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

    addWidgetSpeedData() {
        console.log('add');
        this.widgets.push({
            title: 'Speed Data',
            dragAndDrop: true,
            resizable: true,
            content: 'some statistics here'
        });
    }

    remove($event, index: number, gridster) {
        $event.preventDefault();
        this.widgets.splice(index, 1);
        console.log('widget remove', index);
    }

  title1: string = '每日慢跑公里數';
  title2: string = '每日慢跑平均速率';

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;

  private margin2_1: Margin;
  private margin2_2: Margin;
  private width2: number;
  private height2: number;
  private height2_2: number;
  private svg2: any;
  private x2: any;
  private x2_2: any;
  private y2: any;
  private y2_2: any;
  private xAxis: any;
  private xAxis_2: any;
  private yAxis: any;
  private context: any;
  private brush: any;
  private zoom: any;
  private area: any;
  private area_2: any;
  private focus: any;
  private parseDate = d3TimeFormat.timeParse('%b %Y');

  private htmlElement: HTMLElement;
  private host: d3.Selection;
  

  constructor(private elementRef: ElementRef) {
    this.htmlElement = elementRef.nativeElement;
    this.host = d3.select(this.htmlElement);
    this.width = 700 - this.margin.left - this.margin.right ;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.removeLine;
    this.addLine;
    this.setWidth;
    this.setHeight;
    this.initMargins();
    

    this.initSvg()
    this.initAxis();
    this.drawAxis();
    this.drawLine();
    this.drawChart(this.parseData(sp500));
  }

  private initMargins() {
    this.margin2_1 = { top2: 20, right2: 20, bottom2: 110, left2: 40 };
    this.margin2_2 = { top2: 430, right2: 20, bottom2: 30, left2: 40 };
  }

  private parseData(data: any[]): Stock2[] {
    return data.map(v => <Stock2>{ date: this.parseDate(v.date), price: v.price });
  }

  private initSvg() {
    this.svg = this.host.select(".svg1")
                 .append("svg:g")
                 .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.svg2 = this.host.selectAll(".svg2");
    this.width2 = +this.svg2.attr('width') - this.margin2_1.left2 - this.margin2_1.right2;
    this.height2 = +this.svg2.attr('height') - this.margin2_1.bottom2 - this.margin2_1.top2;
    this.height2_2 = +this.svg2.attr('height') - this.margin2_2.top2 - this.margin2_2.bottom2;

    this.x2 = d3Scale.scaleTime().range([0, this.width2]);
    this.x2_2 = d3Scale.scaleTime().range([0, this.width2]);
    this.y2 = d3Scale.scaleTime().range([this.height2, 0]);
    this.y2_2 = d3Scale.scaleTime().range([this.height2_2, 0]);
    this.xAxis = d3Axis.axisBottom(this.x2);
    this.xAxis_2 = d3Axis.axisBottom(this.x2_2);
    this.yAxis = d3Axis.axisLeft(this.y2);
    
    this.brush = d3Brush.brushX()
        .extent([[0, 0], [this.width2, this.height2_2]])
        .on('brush end', this.brushed.bind(this));

    this.zoom = d3Zoom.zoom()
        .scaleExtent([1, Infinity])
        .translateExtent([[0, 0], [this.width2, this.height2]])
        .extent([[0, 0], [this.width2, this.height2]])
        .on('zoom', this.zoomed.bind(this));

    this.area = d3Shape.area()
        .curve(d3Shape.curveMonotoneX)
        .x((d: any) => this.x2(d.date))
        .y0(this.height2)
        .y1((d: any) => this.y2(d.price));

    this.area_2 = d3Shape.area()
        .curve(d3Shape.curveMonotoneX)
        .x((d: any) => this.x2_2(d.date))
        .y0(this.height2_2)
        .y1((d: any) => this.y2_2(d.price));

    this.svg2.append('defs').append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('width', this.width2)
        .attr('height', this.height2);

    this.focus = this.svg2.append('g')
        .attr('class', 'focus')
        .attr('transform', 'translate(' + this.margin2_1.left2 + ',' + this.margin2_1.top2 + ')');
    
    this.context = this.svg2.append('g')
        .attr('class', 'context')
        .attr('transform', 'translate(' + this.margin2_2.left2 + ',' + this.margin2_2.top2 + ')');

  }

  private initAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(Stocks, (d) => d.date ));
    this.y.domain(d3Array.extent(Stocks, (d) => d.value ));
  }

  private drawAxis() {

    this.svg.append("svg:g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + this.height + ")")
          .call(d3Axis.axisBottom(this.x));

    this.svg.append("svg:g")
          .attr("class", "axis axis--y")
          .call(d3Axis.axisLeft(this.y))
          .append("text")
          .attr("class", "axis-title")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Price ($)");
  }

  private drawLine() {
    this.line = d3Shape.line()
                       .x( (d: any) => this.x(d.date) )
                       .y( (d: any) => this.y(d.value) );

    this.svg.append("svg:path")
            .datum(Stocks)
            .attr("class", "line")
            .attr("d", this.line);
  }

  

  private brushed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') return;
    let s = d3.event.selection || this.x2_2.range();
    this.x2.domain(s.map(this.x2_2.invert, this.x2_2));
    this.focus.select('.area').attr('d', this.area);
    this.focus.select('.axis--x').call(this.xAxis);
    this.svg2.select('.zoom').call(this.zoom.transform, d3Zoom.zoomIdentity
        .scale(this.width2 / (s[1] - s[0]))
        .translate(-s[0], 0));
  }

  private zoomed() {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') return;
    let t = d3.event.transform;
    this.x2.domain(t.rescaleX(this.x2_2).domain());
    this.focus.select('.area').attr('d', this.area);
    this.focus.select('.axis--x').call(this.xAxis);
    this.context.select('.brush').call(this.brush.move, this.x2.range().map(t.invertX, t));
  }

  private drawChart(data: Stock2[]) {
    this.x2.domain(d3Array.extent(data, (d: Stock2) => d.date));
    this.y2.domain([0, d3Array.max(data, (d: Stock2) => d.price)]);
    this.x2_2.domain(this.x2.domain());
    this.y2_2.domain(this.y2.domain());

    this.focus.append('path')
        .datum(data)
        .attr('class', 'area')
        .attr('d', this.area);

    this.focus.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + this.height2 + ')')
        .call(this.xAxis);

    this.focus.append('g')
        .attr('class', 'axis axis--y')
        .call(this.yAxis);

    this.context.append('path')
        .datum(data)
        .attr('class', 'area')
        .attr('d', this.area_2);
    
    this.context.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + this.height2_2 + ')')
        .call(this.xAxis_2);
    
    this.context.append('g')
        .attr('class', 'brush')
        .call(this.brush)
        .call(this.brush.move, this.x2.range());
    
    this.svg2.append('rect')
        .attr('class', 'zoom')
        .attr('width', this.width2)
        .attr('height', this.height2)
        .attr('transform', 'translate(' + this.margin2_1.left2 + ',' + this.margin2_1.top2 + ')')
        .call(this.zoom);

  }

}
