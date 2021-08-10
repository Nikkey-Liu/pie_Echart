import React, { Component, ReactNode, createElement } from "react";

import "../node_modules/echarts/dist/echarts";
import { PieEchartContainerProps } from "../typings/PieEchartProps";
import ReactECharts from 'echarts-for-react';
import "./ui/PieEchart.css";
import { ValueStatus } from "mendix";

export default class PieEchart extends Component<PieEchartContainerProps> {
  private mylegendlist: any[] = []; //存储Legenddata[] <String>
  private mypercentlist: any[] = [];  // 存储value[]<number>
  private seriesData: any[] = []; //存储chart 的option data 配置
  private echartsReact: any = undefined;


  constructor(props: PieEchartContainerProps) {
    super(props);

    //console.log(this.props.PiePercentage);
    // console.log(this.props.LegandData);
    this.echartsReact = React.createRef();
    this.getOption = this.getOption.bind(this);
    // this.getSeriesData = this.getSeriesData.bind(this);

  }
  //react 声明周期时刻检查数据变化
  componentDidUpdate() {
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
    if (this.mylegendlist != null && this.mypercentlist != null && this.seriesData != null) {
      //判断是否展示加载动画
      if (this.props.showLoading) {
        setTimeout(() => { //设置加载时间
          this.echartsReact.getEchartsInstance().hideLoading();
        }, this.props.loadingTime * 1000);

      }


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
      tooltip: {
        trigger: 'item',
        formatter: this.props.FormattedTooltip === null || this.props.FormattedTooltip === "" ? this.props.FormattedTooltip : "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: this.mylegendlist       //[1,2,3,4,5]
      },
      series: [
        {
          name: '访问来源',
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
    return option;
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
