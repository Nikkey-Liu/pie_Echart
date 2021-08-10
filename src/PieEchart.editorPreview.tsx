import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { PieEchartPreviewProps } from "../typings/PieEchartProps";

declare function require(name: string): string;

export class preview extends Component<PieEchartPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={'hello'} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/PieEchart.css");
}
