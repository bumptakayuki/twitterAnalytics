var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('style-loader!./lineChart.scss');
var LineChart = (function () {
    function LineChart(_lineChartService) {
        this._lineChartService = _lineChartService;
        this.chartData = this._lineChartService.getData();
    }
    LineChart.prototype.initChart = function (chart) {
        var zoomChart = function () {
            chart.zoomToDates(new Date(2013, 3), new Date(2014, 0));
        };
        chart.addListener('rendered', zoomChart);
        zoomChart();
        if (chart.zoomChart) {
            chart.zoomChart();
        }
    };
    LineChart = __decorate([
        core_1.Component({
            selector: 'line-chart',
            templateUrl: './lineChart.html'
        })
    ], LineChart);
    return LineChart;
})();
exports.LineChart = LineChart;
//# sourceMappingURL=lineChart.component.js.map