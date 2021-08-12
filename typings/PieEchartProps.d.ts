/**
 * This file was generated from PieEchart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export type ChartTypeEnum = "pie" | "RoseArea" | "RoseRadius" | "Doughnut" | "borderRadiusDoughnut";

export type ChartThemeEnum = "default" | "light" | "dark";

export type ShowLegendWayEnum = "horizontal" | "vertical";

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export interface PieEchartContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    dataSource: ListValue;
    PiePercentage: ListAttributeValue<Big>;
    LegandData: ListAttributeValue<string>;
    chartType: ChartTypeEnum;
    ChartTheme: ChartThemeEnum;
    mytitle: string;
    mysubtitle: string;
    showtoolBox: boolean;
    showLoading: boolean;
    loadingTime: number;
    Showlable: boolean;
    ShowLegend: boolean;
    ShowLegendWay: ShowLegendWayEnum;
    FormattedTooltip: string;
    onChartReady?: ActionValue;
    onChartClick?: ActionValue;
    onChartLegendselectchanged?: ActionValue;
    Jsondata: string;
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
}

export interface PieEchartPreviewProps {
    class: string;
    style: string;
    dataSource: {} | { type: string } | null;
    PiePercentage: string;
    LegandData: string;
    chartType: ChartTypeEnum;
    ChartTheme: ChartThemeEnum;
    mytitle: string;
    mysubtitle: string;
    showtoolBox: boolean;
    showLoading: boolean;
    loadingTime: number | null;
    Showlable: boolean;
    ShowLegend: boolean;
    ShowLegendWay: ShowLegendWayEnum;
    FormattedTooltip: string;
    onChartReady: {} | null;
    onChartClick: {} | null;
    onChartLegendselectchanged: {} | null;
    Jsondata: string;
    widthUnit: WidthUnitEnum;
    width: number | null;
    heightUnit: HeightUnitEnum;
    height: number | null;
}
