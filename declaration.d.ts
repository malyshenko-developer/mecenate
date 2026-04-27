declare module "*.svg" {
    import React from 'react';
    import { SvgProps } from "react-native-svg";
    const ReactComponent: React.FunctionComponent<SvgProps>;
    export default ReactComponent;
}