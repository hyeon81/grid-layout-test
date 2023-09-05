import React, {useCallback, useState} from "react";
import GridLayout from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

function MyFirstGrid() {
    const [gridItems, setGridItems] = useState([
        {i: 0, x: 0, y: 0, w: 1, h: 1}
    ]);
    const [index, setIndex] = useState(1);

    const onDrop = useCallback((currentLayout, layoutItem) => {
            setGridItems([...gridItems, {...layoutItem, i: index}]);
            setIndex(index + 1);
        }
        , [index]);

    return (
        <div>
            {/* 드래그 될 요소*/}
            <div
                className="droppable-element"
                draggable={true}
                unselectable="on"
            >
                <div style={{
                    backgroundColor: "red", width: 50,
                    height: 50,
                }}>e
                </div>
            </div>
            <div style={{backgroundColor: "gray", width: 600, height: 560, marginTop: 20}}>
                {/* 드래그 할 레이아웃 */}
                <GridLayout className="layout" cols={12} rowHeight={30} width={1200}
                            onDrop={onDrop}
                            isDroppable={true}
                            compactType={null} preventCollision={true}>
                    {gridItems.map(({i, x, y, w, h}) => (
                        <div key={i} data-grid={{x, y, w, h}} style={{backgroundColor: "red"}}>
                        </div>
                    ))}
                </GridLayout>
            </div>
        </div>
    );
}

export default MyFirstGrid;