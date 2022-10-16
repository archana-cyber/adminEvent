import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const genderOptions = {
    chart: {
      type: "pie",
    //   marginRight: 300
    },
    title: {
      text: "Gender Ratio"
    },
    credits: {
      enabled: false
    },
    // plotOptions: {
    //   pie: {
    //     allowPointSelect: true,
    //     cursor: "pointer",
    //     dataLabels: {
    //       enabled: false
    //     },
    //     showInLegend: false
    //   }
    // },
    accessibility: {
        announceNewData: {
            enabled: true
        },
        point: {
            valueSuffix: '%'
        }
    },

    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '<span style="font-size:18px;font-weight:lighter;">{point.name}<br/>{point.y:.1f}%</span> '
            }
        },
        pie: {
          size:'90%',
          minSize:'90%',
         
      },
     
    },

    tooltip: {
        headerFormat: '<span >{series.name}</span><br>',
        pointFormat: '<span >{point.name}</span>: <b>{point.y:.2f}%</b> <br/>'
    },
    //colors:[],
   colors:["#48557f","#6867b3"],
    // series:[],
    series: [
      {
        name: "",
        color: "#006600",
        // lineWidth: 1,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 3,
          states: {
            hover: {
              enabled: true,
              lineWidth: 1
            }
          }
        },
        data: [
          {
            name:"Women",
            y: 54.7,
          },
          {
            name:"Men",
            y:45.3,
          }
        ]
      }
    ],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 600
        },
        chartOptions: {
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false,
              },
             
              showInLegend: true
            },
           
          },
          pie: {
            size:'90%',
            minSize:'90%'
          },
          chart: {
            marginRight: 0
          },
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal',
          itemMarginTop: 5,
          itemStyle: {
            fontWeight: 'normal'
          },
          useHTML: true,
          labelFormatter: function() {
            return `<span style="font-size:18px;font-weight:lighter;line-height:1;">${this.name}<br/>${this.y}%</span> `
          }
        },
        }
      }]
    }
  };
  const userOptions = {
    chart: {
      type: "pie",
    //   marginRight: 300
    },
    title: {
      text: "Different Type Users"
    },
    credits: {
      enabled: false
    },
    // plotOptions: {
    //   pie: {
    //     allowPointSelect: true,
    //     cursor: "pointer",
    //     dataLabels: {
    //       enabled: false
    //     },
    //     showInLegend: false
    //   }
    // },
    accessibility: {
        announceNewData: {
            enabled: true
        },
        point: {
            valueSuffix: '%'
        }
    },

    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '<span style="font-size:18px;font-weight:lighter;">{point.name}<br/>{point.y:.1f}%</span> '
            }
        },
        pie: {
          size:'90%',
          minSize:'90%',
         
      },
     
    },

    tooltip: {
        headerFormat: '<span >{series.name}</span><br>',
        pointFormat: '<span >{point.name}</span>: <b>{point.y:.2f}%</b> <br/>'
    },
    //colors:[],
   colors:["#c6d5ff","#48557f","#6867b3"],
    // series:[],
    series: [
      {
        name: "",
        color: "#006600",
        // lineWidth: 1,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 3,
          states: {
            hover: {
              enabled: true,
              lineWidth: 1
            }
          }
        },
        data: [
          {
            name:"Admin",
            y: 14.7,
          },
          {
            name:"Customer",
            y:54.7,
          },
          
          {
            name:"Influencer",
            y:30.6,
          }
        ]
      }
    ],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 600
        },
        chartOptions: {
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false,
              },
             
              showInLegend: true
            },
           
          },
          pie: {
            size:'90%',
            minSize:'90%'
          },
          chart: {
            marginRight: 0
          },
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal',
          itemMarginTop: 5,
          itemStyle: {
            fontWeight: 'normal'
          },
          useHTML: true,
          labelFormatter: function() {
            return `<span style="font-size:18px;font-weight:lighter;line-height:1;">${this.name}<br/>${this.y}%</span> `
          }
        },
        }
      }]
    }
  };
  const options = {
    chart: {
        type:'line',
      height: 400
    },
    title: {
      text: 'User Enrollment'
    },
    xAxis: {
      categories: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug" ],
    //   categories:[],
      title:{
        text:''
      }
    },
    yAxis: {
    //   categories: [ "0", "500", "1000", "1500" ],
      title:false
    },
    plotOptions: {
  
      line:{
        // color:"",
       color:"#6867b3",
     
      }
      // series: {
      //     dataLabels: {
      //         enabled: true,
      //         format: '<span>{point.name}<br/>{point.y:.1f}%</span> '
      //     }
      // }
  },
    series: [{
      name:"Enrollment",
    //   data:[],
     data: [0,150,300,600,950,1000,1300,1500],
      showInLegend: false,
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 400
        },
        chartOptions: {
        chart: {
          height: 200 
        },
      }
       
      }]
    }
  }
  
const Home = () => {
  return (
    <div>
         
            <div className="event-card-wrp">
                <div className="event-card">
                    <h3>4,567</h3>
                    <p>Total Event</p>
                </div>
                <div className="event-card">
                    <h3>4,567</h3>
                    <p>Total Revenue Earning</p>
                </div>
                <div className="event-card">
                    <h3>4,567</h3>
                    <p>Total Ticket Sold</p>
                </div>
                <div className="event-card">
                    <h3>4,567</h3>
                    <p>Total Engagement</p>
                </div>
            </div>
            <div className="chart-wrp">
            <HighchartsReact highcharts={Highcharts} options={genderOptions} />
            <HighchartsReact highcharts={Highcharts} options={userOptions} />
            </div>
            <div className='line-graph-wrp'>
            
             <HighchartsReact highcharts={Highcharts} options={options} />

            </div>
    </div>
  )
}

export default Home