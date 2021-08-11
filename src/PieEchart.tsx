import React, { Component, ReactNode, createElement } from "react";
import deepMerge from "deepmerge";
import "../node_modules/echarts/dist/echarts";
import { PieEchartContainerProps } from "../typings/PieEchartProps";
import ReactECharts from 'echarts-for-react';
import "./ui/PieEchart.css";
import { ValueStatus } from "mendix";

//const OarrayMerge = (_destinationArray: any[], sourceArray: any[]) => sourceArray;
export default class PieEchart extends Component<PieEchartContainerProps> {
  private mylegendlist: any[] = []; //存储Legenddata[] <String>
  private mypercentlist: any[] = [];  // 存储value[]<number>
  private seriesData: any[] = []; //存储chart 的option data 配置
  private echartsReact: any = undefined;
  private chartType: String = '';
  private legendType:String='';
  constructor(props: PieEchartContainerProps) {
    super(props);
    this.echartsReact = React.createRef();
    this.getOption = this.getOption.bind(this);
    this.chartType = this.props.chartType;
    
  }
  //react 声明周期时刻检查数据变化
  componentDidUpdate() {
    //读取mendix数据 listAttribute
    this.props.dataSource.status === ValueStatus.Available ? this.props.dataSource.items?.forEach(item => {
      let iLegend = this.props.LegandData.get(item)?.value;
      let iValue = this.props.PiePercentage.get(item)?.value?.toNumber();
      this.mylegendlist.push(iLegend);
      this.mypercentlist.push(iValue);

      this.seriesData.push({
        value: iValue,
        name: iLegend
      });

    }) : null;
    this.legendType= this.mylegendlist.length<10?"plain": "scroll";
   

    if (this.mylegendlist != null && this.mypercentlist != null && this.seriesData != null) {
      //判断是否展示加载动画
      if (this.props.showLoading) {
        setTimeout(() => { //设置加载时间
          this.echartsReact.getEchartsInstance().hideLoading();
        }, this.props.loadingTime * 1000);
      }
      console.log(this.getOption());
      this.echartsReact.getEchartsInstance().setOption(this.getOption());
    }

  }
  //sizestyle     设置size属性

  renderSizeOfDiv() {
    var mysize = {                       // 声明一个div size对象
      width: '0',
      height: '0',
      widthUnit: '',
      heightUnit: '',
      paddingBottom: '0'
    };
    mysize.width = this.props.widthUnit === "percentage" ? `${this.props.width}%` : `${this.props.width}px`
    if (this.props.heightUnit === "percentageOfWidth") {
      mysize.paddingBottom = this.props.widthUnit === "percentage"
        ? `${this.props.height}%`
        : `${this.props.width / 2}px`
    } else if (this.props.heightUnit === "pixels") {
      mysize.height = `${this.props.height}px`
    } else if (this.props.heightUnit === "percentageOfParent") {
      mysize.height = `${this.props.height}%`
    }
    const myDivStyle = {
      height: mysize.height, width: mysize.width
    };
    if (mysize.paddingBottom !== '0') {
      const myDivStylep = {
        width: mysize.width, paddingBottom: mysize.paddingBottom
      };
      console.log(myDivStylep)
      return myDivStylep
    }
    console.log(myDivStyle)
    return myDivStyle
  }



  //getOption() 获得option的配置
  getOption() {
    let option = {
      title: {
        text: this.props.mytitle,
        subtext: this.props.mysubtitle,
        x: 'center'
      },
      toolbox: {
        show: this.props.showtoolBox,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: false },//问题待修复，无法刷新，点击后出现图片空白的情况
          saveAsImage: { show: true }
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: this.props.FormattedTooltip === null || this.props.FormattedTooltip === "" ? this.props.FormattedTooltip : "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        type: this.legendType,
        orient: this.props.ShowLegendWay,
        left: 'left',
        show: this.props.ShowLegend,
        data: this.mylegendlist,     
    
        top:'10%'
    
      },
      series: [
        {
          name: this.props.mytitle,
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          label: {
            show: this.props.Showlable
          },
          data: this.seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    // 根据半径来展示玫瑰图
    let RoseRadius = {
      series: [
        {
          radius: [20, 140],
          center: ['25%', '50%'],
          roseType: 'radius',
          itemStyle: {
            borderRadius: 5

          }
        }
      ]
    };

    // 根据面积来展示玫瑰图
    let RoseArea = {
      series: [
        {
          radius: [20, 140],
          center: ['75%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          }
        }
      ]
    };
    let borderRadiusDoughnut = {
      series: [
        {
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          }
        }
      ]
    }
    let Doughnut = {
      series: [
        {

          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          }
        }
      ]
    }


    switch (this.chartType) {
      case "RoseArea": {
        //option= deepMerge(option, RoseArea);
        // return  deepMerge.all([option, RoseArea, this.props.Jsondata != null && this.props.Jsondata != '' ? JSON.parse(this.props.Jsondata) : {}])
        return deepMerge.all([option, RoseArea, this.props.Jsondata != null && this.props.Jsondata != '' ? JSON.parse(this.props.Jsondata) : {}], { arrayMerge });
        break;
      }
      case "RoseRadius": {
          //option=deepMerge(option,RoseRadius);
        return deepMerge.all([option, RoseRadius, this.props.Jsondata != null && this.props.Jsondata != '' ? JSON.parse(this.props.Jsondata) : {}], { arrayMerge });

        break;
      }
      case "Doughnut":{
        return deepMerge.all([option, Doughnut, this.props.Jsondata != null && this.props.Jsondata != '' ? JSON.parse(this.props.Jsondata) : {}], { arrayMerge });

        break;
      }
      case "borderRadiusDoughnut" :{
        return deepMerge.all([option, borderRadiusDoughnut, this.props.Jsondata != null && this.props.Jsondata != '' ? JSON.parse(this.props.Jsondata) : {}], { arrayMerge });

        break;
      }
      default: {
        return deepMerge.all([option, this.props.Jsondata != null && this.props.Jsondata != '' ? JSON.parse(this.props.Jsondata) : {}], { arrayMerge });
        //return deepMerge(option,this.props.Jsondata!=null&&this.props.Jsondata!=''?JSON.parse(this.props.Jsondata):{});
        break;
      }
    }  
  }
  componentWillUnmount() {
    while (this.mylegendlist.length) {
      this.mylegendlist.pop();
      this.mypercentlist.pop();
      this.seriesData.pop();
    }
  }

  render(): ReactNode {
    //加载动画
    const loadingOption = {
      text: 'loading...',
      color: '#4413c2',
      textColor: '#270240',
      maskColor: 'rgba(194, 88, 86, 0.3)',
      zlevel: 0
    };

    return <ReactECharts
      ref={(e) => { this.echartsReact = e }}
      className={'${this.props.class}'}
      option={this.getOption()}
      style={this.renderSizeOfDiv()}
      loadingOption={loadingOption}
      theme={this.props.ChartTheme === "default" ? "" : this.props.ChartTheme}
      showLoading={this.props.showLoading}// 获得是否显示loading动画
    />;
  }
}


//deep meger操作工具函数
const emptyTarget = (value: any) => Array.isArray(value) ? [] : {};

const clone = (value: any, options: any) => deepMerge(emptyTarget(value), value, options);
const arrayMerge = (target: any[], source: any[], options: any) => {
  const destination = target.slice();

  source.forEach((e, i) => {
    if (typeof destination[i] === "undefined") {
      const cloneRequested = options.clone !== false;
      const shouldClone = cloneRequested && options.isMergeableObject(e);
      destination[i] = shouldClone ? clone(e, options) : e;
    } else if (options.isMergeableObject(e)) {
      destination[i] = deepMerge(target[i], e, options);
    } else if (target.indexOf(e) === -1) {
      destination.push(e);
    }
  });

  return destination;
};
