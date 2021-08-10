/**
 * This file was generated from PieEchart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export type ChartTypeEnum = "pie" | "donut";

export type ChartThemeEnum = "default" | "light" | "dark";

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "percentageOfWidth" | "pixels" | "percentageOfParent";

export interface PieEchartContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    FormattedTooltip: string;
    dataSource: ListValue;
    PiePercentage: ListAttributeValue<Big>;
    LegandData: ListAttributeValue<string>;
    chartType: ChartTypeEnum;
    ChartTheme: ChartThemeEnum;
    mytitle: string;
    mysubtitle: string;
    showLoading: boolean;
    loadingTime: number;
    Showlable: boolean;
    Jsondata: string;
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    height: number;
}

export interface PieEchartPreviewProps {
    class: string;
    style: string;
    FormattedTooltip: string;
    dataSource: {} | { type: string } | null;
    PiePercentage: string;
    LegandData: string;
    chartType: ChartTypeEnum;
    ChartTheme: ChartThemeEnum;
    mytitle: string;
    mysubtitle: string;
    showLoading: boolean;
    loadingTime: number | null;
    Showlable: boolean;
    Jsondata: string;
    widthUnit: WidthUnitEnum;
    width: number | null;
    heightUnit: HeightUnitEnum;
    height: number | null;
}
