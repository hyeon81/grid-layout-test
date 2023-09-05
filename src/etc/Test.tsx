import React, {useCallback, useState} from "react";
import GridLayout from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

function MyFirstGrid() {
    const [gridItems, setGridItems] = useState([
        {i: 0, x: 0, y: 0, w: 1, h: 1}
    ]);
    const [index, setIndex] = useState(1);

    const onDrop = useCallback((currentLayout, layoutItem, _event) => {
            setGridItems([...gridItems, {...layoutItem, i: index}]);
            setIndex(index + 1);
        }
        ,[index]);

    return (
        <div>
            <div
                className="droppable-element"
                draggable={true}
                unselectable="on"
            >
                <div>droppable element</div>
            </div>
            <GridLayout className="layout" cols={12} rowHeight={30} width={1200}
                        onDrop={onDrop}
                        isDroppable={true}
                        compactType={null} preventCollision={true}>
                {gridItems.map(({i, x, y, w, h}) => (
                    <div key={i} data-grid={{x, y, w, h}}>
                        {i}
                    </div>
                ))}
            </GridLayout>
        </div>
    );
}

export default MyFirstGrid;