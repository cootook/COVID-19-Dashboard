export default class Graph {
    constructor() {
        this.container = document.querySelector('.graph-container');
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
    }

    initSize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.canvas.width = this.width + 'px';
        this.canvas.height = this.height + 'px';
    }

    createGraph(labelX, values, type, legend) {
            this.bgColorArr = [];
            this.borderColorArr = [];
            for (let i = 0; i < values.length; i += 1) {
                this.bgColorArr.push('rgba(54, 162, 235, 1)');
                this.borderColorArr.push('rgba(255, 99, 132, 1)');

            }

        this.myChart = new Chart(this.ctx, {
            type: type,
            data: {
                labels: labelX,
                datasets: [{
                    label: legend,
                    data: values,
                    backgroundColor: this.bgColorArr,
                    borderColor: this.borderColorArr,
                    fill: false,
                    //borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                legend: {
                   labels: {
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                    fontColor: 'white',
                    boxWidth: 0,
                  }
                },
                tooltips: {
                    custom: function(tooltip) {
                        if (!tooltip) return;
                        // disable displaying the color box;
                        tooltip.displayColors = false;
                      },
                    callbacks: {
                      label: function(tooltipItem) {
                        return tooltipItem.label, tooltipItem.value;
                    }
                  }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}

    