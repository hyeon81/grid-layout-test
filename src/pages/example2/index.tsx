import React from "react";
import GridLayout from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

function MyFirstGrid() {
    const gridItems = [
        { i: "a", dataGrid: { x: 0, y: 0, w: 1, h: 2}},
        { i: "b", dataGrid: { x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 }},
        { i: "c", dataGrid: { x: 4, y: 0, w: 1, h: 2 }},
    ];

    return (
        <GridLayout className="layout" cols={12} rowHeight={30} width={1200}
                    compactType={null} preventCollision={true}>
            {gridItems.map(({i, dataGrid}) => (
                <div key={i} data-grid={dataGrid} style={{backgroundColor: i === "a" ? "red" : i === "b" ? "blue" : "green"}}>{i}</div>
            ))}
        </GridLayout>
    );
}

export default MyFirstGrid;