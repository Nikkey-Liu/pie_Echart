import { Component, ReactNode, createElement } from "react";
// import { HelloWorldSample } from "./components/HelloWorldSample";
import { PieEchartPreviewProps } from "../typings/PieEchartProps";
import ReactECharts from "echarts-for-react";
declare function require(name: string): string;

export class preview extends Component<PieEchartPreviewProps> {
    getOption() {
        const option = {
            title: {
                text: this.props.mytitle,
                subtext: this.props.mysubtitle,
                left: "center"
            },
            tooltip: {
                trigger: "item"
            },
            legend: {
                top: "10%",
                orient: "horizontal",
                left: "left"
            },
            series: [
                {
                    name: "访问来源",
                    type: "pie",
                    radius: "50%",
                    data: [
                        { value: 1048, name: "搜索引擎" },
                        { value: 735, name: "直接访问" },
                        { value: 580, name: "邮件营销" },
                        { value: 484, name: "联盟广告" },
                        { value: 300, name: "视频广告" }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                }
            ]
        };
        return option;
    }

    render(): ReactNode {
        return <ReactECharts option={this.getOption()} style={{ height: 400 }} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/PieEchart.css");
}
