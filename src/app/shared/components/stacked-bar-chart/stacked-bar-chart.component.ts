import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexTitleSubtitle,
    ApexDataLabels,
    ApexLegend,
    ApexPlotOptions,
    ApexFill,
    ApexTooltip,
    ApexYAxis
} from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    tooltip: ApexTooltip;
    legend: ApexLegend;
    title: ApexTitleSubtitle;
    colors?: string[];
};

@Component({
    selector: 'app-stacked-bar-chart',
    standalone: true,
    imports: [CommonModule, NgApexchartsModule],
    templateUrl: './stacked-bar-chart.component.html',
    styleUrl: './stacked-bar-chart.component.scss'
})
export class StackedBarChartComponent {
    @Input() chartOptions: ChartOptions = {
        series: [],
        chart: {
          type: 'bar',
          stacked: true,
          height: 350
        },
        colors: ['#28A745', '#6C757D', '#4DD0E1', '#7F7BFF'], 
        xaxis: {
          categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']
        },yaxis: {
            title: {
                text: 'Qtd. de Eventos'
            }
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        legend: {
            position: 'top'
        },
        title: {
            text: 'Projeção de Eventos'
        },
        plotOptions: {
            bar: {
                horizontal: false
            }
        }
    };

    // chartOptions: ChartOptions = {
    //     series: [],
    //     chart: {
    //         type: 'bar',
    //         stacked: true,
    //         height: 350
    //     },
    //     xaxis: {
    //         categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']
    //     },
    //     yaxis: {
    //         title: {
    //             text: 'Qtd. de Eventos'
    //         }
    //     },
    //     dataLabels: {
    //         enabled: false
    //     },
    //     fill: {
    //         opacity: 1
    //     },
    //     tooltip: {
    //         shared: true,
    //         intersect: false
    //     },
    //     legend: {
    //         position: 'top'
    //     },
    //     title: {
    //         text: 'Projeção de Eventos'
    //     },
    //     plotOptions: {
    //         bar: {
    //             horizontal: false
    //         }
    //     }
    // };

}
