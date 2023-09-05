import React from "react";
import {Responsive, WidthProvider} from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

function MyResponsiveGrid() {
    const layouts = {
        lg: [
            { i: "1", x: 0, y: 0, w: 4, h: 2 },
            { i: "2", x: 4, y: 0, w: 4, h: 2 },
            { i: "3", x: 8, y: 0, w: 4, h: 2 },
        ],
        md: [
            { i: "1", x: 0, y: 0, w: 6, h: 2 },
            { i: "2", x: 6, y: 0, w: 6, h: 2 },
            { i: "3", x: 0, y: 2, w: 12, h: 2 },
        ],
        sm: [
            { i: "1", x: 0, y: 0, w: 6, h: 2 },
            { i: "2", x: 6, y: 0, w: 6, h: 2 },
            { i: "3", x: 0, y: 2, w: 12, h: 2 },
        ],
    };

    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 6, sm: 6, xs: 4, xxs: 2 }}
        >
            <div key="1" style={{backgroundColor: "red"}}>1</div>
            <div key="2" style={{backgroundColor: "blue"}}>2</div>
            <div key="3" style={{backgroundColor: "green"}}>3</div>
        </ResponsiveGridLayout>
    );
}

export default MyResponsiveGrid;