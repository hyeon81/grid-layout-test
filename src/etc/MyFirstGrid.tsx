'use client';

import GridLayout from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import {Input} from "@mui/material";
import React, {useCallback, useState} from "react";

const MyFirstGrid = () => {
    const [layout, setLayout] = useState([
        {i: 0, x: 0, y: 0, w: 1, h: 1, minW: null, maxW: null, type: "input"}
    ]);
    const [index, setIndex] = useState(1);
    const [type, setType] = useState<"input" | "image">("input");
    const [isDropping, setIsDropping] = useState(false);

    //onDrop 함수는 드래그한 요소를 놓았을 때 호출되는 함수입니다.
    //currentLayout은 현재 그리드의 레이아웃 정보를 담고 있습니다.
    //layoutItem은 드래그한 요소의 레이아웃 정보를 담고 있습니다.
    //event는 이벤트 객체입니다.
    const onDrop = useCallback((currentLayout, layoutItem, _event) => {
            console.log("onDrop");
            setLayout([...layout, {
                ...layoutItem,
                i: index.toString(),
                type: type,
                w: type === "image" ? 2 : 1,
                minW: null,
                maxW: null
            }]);
            setIndex(index + 1);
        }
        , [index, layout, type]);

    const onLayoutChange = useCallback((currentLayout) => {
        console.log("onLayoutChange", currentLayout);
        console.log("layout22", layout);
        const newHeight = document?.querySelector(".react-grid-layout")?.offsetHeight;
        console.log("newHeight", newHeight);

        if (newHeight > 560) {
            console.log("newHeight!!", newHeight);
            const prevLayout = [...layout];
            // setLayout([
            //     {i: 0, x: 0, y: 0, w: 1, h: 1, minW: null, maxW: null, type: "input"}
            // ])
            setLayout(prevLayout);
            return;
        }
        if (!isDropping) {
            console.log("isDropping", isDropping);
            const updatedCurrentLayout = currentLayout.map((item, i) => {
                item.type = layout[i].type;
                return item;
            });
            setLayout(updatedCurrentLayout);
        }
    }, [isDropping, layout]);


    console.log("layout", layout);
    return (
        <div>
            <div style={{backgroundColor: 'skyblue', padding: 10, display: 'flex', maxHeight: 600, overflow: "hidden"}}>
                <div
                    style={{
                        width: 50,
                        height: 50,
                        display: 'flex',
                        alignItems: 'center',
                        margin: 10
                    }}
                    className="droppable-element"
                    draggable={true} //true면 드래그 가능
                    unselectable="on"
                    onDragStart={e => {
                        console.log("onDragStart!!!!!!!");
                        setIsDropping(true);
                        e.dataTransfer.setData("text/plain", "");
                        setType("input");
                    }}
                >
                    <Input fullWidth sx={{height: "100%", backgroundColor: "white"}}

                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: 10
                    }}
                    className="droppable-element"
                    draggable={true}
                    unselectable="on"
                    onDragStart={e => {
                        setIsDropping(true);
                        console.log("onDragStart!!!!!!!");
                        e.dataTransfer.setData("text/plain", "");
                        setType("image");
                    }}
                    onDragEnd={e => {
                        console.log("onDragEnd!!!!!!!");
                        setIsDropping(false);
                    }}
                >
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDq_on3TrwHVzian3yE6f4SENJOCgz45oaHw&usqp=CAU"
                        alt="beluga"
                        width={100}
                        height={50}
                    />
                </div>
            </div>
            <div style={{backgroundColor: "gray", padding: 10, width: 600, maxHeight: 560}}>
                <GridLayout
                    className="layout"
                    cols={12} //그리드의 열 수
                    rowHeight={60} //그리드 항목의 높이
                    width={720} //그리드의 너비
                    preventCollision={true} //true면 그리드 항목을 드래그해도 위치가 변경되지 않음
                    compactType={null} //null이면 아무데나 놓을 수 있음. vertical이면 위에서 아래로 채워짐. horizontal이면 왼쪽에서 오른쪽으로 채워짐
                    onDrop={onDrop}
                    isDroppable={true} //true면 draggable={true}인 요소를 드래그 가능
                    onLayoutChange={onLayoutChange}
                >
                    {layout.map(({i, x, y, w, h, type}) => {
                        console.log("render", layout);
                        return (
                            <div key={i} data-grid={{x, y, w, h}}
                                 style={{backgroundColor: "red", display: 'flex', alignItems: 'center'}}>
                                {type === "input" && <Input fullWidth sx={{height: "100%", backgroundColor: "white"}}
                                />}
                                {
                                    type === "image" && <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDq_on3TrwHVzian3yE6f4SENJOCgz45oaHw&usqp=CAU"
                                        alt="beluga"
                                        width={50 * w}
                                        height={50 * h}
                                    />
                                }
                            </div>
                        )
                    })
                    }
                </GridLayout>
            </div>
        </div>
    )
}

export default MyFirstGrid;