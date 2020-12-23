export default class Graph {
    constructor() {
        this.container = document.querySelector('.graph-container__content');
        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        this.graphTitle = document.querySelector('.graph-container__title');

    }

    initSize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.canvas.width = this.width + 'px';
        this.canvas.height = this.height + 'px';
    }

    update() {
        if (this.myChart) {
            this.myChart.destroy();
        }
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
                    maintainAspectRatio: false,
                responsive: true,
                // legend: {
                //    labels: {
                //     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                //     fontColor: 'white',
                //     boxWidth: 0,
                //   }
                // },
                legend: false,
                tooltips: {
                    custom: function(tooltip) {
                        if (!tooltip) return;
                        // disable displaying the color box;
                        tooltip.displayColors = false;
                      },
                    callbacks: {
                      label: function(tooltipItem) {
                          let label = tooltipItem.label;
                          let value = tooltipItem.value;
                        //   if (value > 1000) {
                        //       value = Math.floor(value/1000000) + 'M';
                        //   }
                        return label, value;
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

    