'use client';

import GridLayout from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import {Input} from "@mui/material";
import React, {useState} from "react";

const MyFirstGrid = () => {
    const [layout, setLayout] = useState([
        {i: 0, x: 0, y: 0, w: 1, h: 1, minW: 2}
    ]);
    const [index, setIndex] = useState(1);

    //onDrop: 그리드 항목을 드래그해서 그리드에 놓을 때 호출되는 함수
    const onDrop = (currentLayout, layoutItem) => {
        setLayout([...layout, {...layoutItem, i: index}]);
        setIndex(index + 1);
    }

    console.log("renderLayout", layout);
    return (
        <div>
            <div style={{backgroundColor: 'skyblue', padding: 10}}>
                <div
                    style={{
                        backgroundColor: "green",
                        width: 50,
                        height: 50,
                        display: 'flex',
                        alignItems: 'center',
                        margin: 10
                    }}
                    className="droppable-element"
                    draggable={true}
                    // unselectable="on"
                    // this is a hack for firefox
                    // Firefox requires some kind of initialization
                    // which we can do by adding this attribute
                    // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                    // onDragStart={e => e.dataTransfer.setData("text/plain", "")}
                >
                    <Input fullWidth sx={{height: "100%", backgroundColor: "white"}}
                    />
                </div>
            </div>
            <div style={{backgroundColor: "gray", padding: 10, width: 600}}>
                <GridLayout
                    className="layout"
                    cols={12} //그리드의 열 수
                    rowHeight={50} //그리드 항목의 높이
                    width={600} //그리드의 너비
                    preventCollision={true} //true면 그리드 항목을 드래그해도 위치가 변경되지 않음
                    compactType={null} //null이면 아무데나 놓을 수 있음. vertical이면 위에서 아래로 채워짐. horizontal이면 왼쪽에서 오른쪽으로 채워짐
                    onDrop={onDrop}
                    isDroppable={true} //true면 draggable={true}인 요소를 드래그 가능
                >
                    {layout.map(({i, x, y, w, h}) => (
                        <div key={i} data-grid={{x: x, y: y, w: w, h: h}}
                             style={{backgroundColor: "red", display: 'flex', alignItems: 'center'}}>
                            <Input fullWidth sx={{height: "100%", backgroundColor: "white"}}
                            />
                        </div>
                    ))
                    }
                </GridLayout>
            </div>
        </div>
    )
}

export default MyFirstGrid;