import React from "react";
import _ from "lodash";
import {Responsive, WidthProvider} from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class DragFromOutsideLayout extends React.Component {
    static defaultProps = {
        className: "layout",
        rowHeight: 30,
        onLayoutChange: function () {
        },
        cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    };

    state = {
        currentBreakpoint: "lg",
        compactType: "vertical",
        mounted: false,
        layouts: {lg: generateLayout()}
    };

    componentDidMount() {
        this.setState({mounted: true});
    }

    generateDOM() {
        if (typeof window !== 'undefined') { alert('generateDom이 호출되었습니다!') }
        return _.map(this.state.layouts.lg, function (l, i) {
            return (
                <div key={i} className={l.static ? "static" : ""}>
                    {l.static ? (
                        <span
                            className="text"
                            title="This item is static and cannot be removed or resized."
                        >
              Static - {i}
            </span>
                    ) : (
                        <span className="text">{i}</span>
                    )}
                </div>
            );
        });
    }

    onBreakpointChange = breakpoint => {
        this.setState({
            currentBreakpoint: breakpoint
        });
    };

    onLayoutChange = (layout, layouts) => {
        this.props.onLayoutChange(layout, layouts);
    };

    onDrop = (layout, layoutItem, _event) => {
        alert(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`);
    };

    render() {
        return (
            <div>
                <div>
                    Current Breakpoint: {this.state.currentBreakpoint} (
                    {this.props.cols[this.state.currentBreakpoint]} columns)
                </div>
                <div
                    style={{backgroundColor: "green"}}
                    className="droppable-element"
                    draggable={true}
                    unselectable="on"
                    // this is a hack for firefox
                    // Firefox requires some kind of initialization
                    // which we can do by adding this attribute
                    // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                    onDragStart={e => e.dataTransfer.setData("text/plain", "")}
                >
                    Droppable Element (Drag me!)
                </div>
                <ResponsiveReactGridLayout
                    style={{backgroundColor: "gray"}}
                    {...this.props}
                    layouts={this.state.layouts}
                    onBreakpointChange={this.onBreakpointChange}
                    onLayoutChange={this.onLayoutChange}
                    onDrop={this.onDrop}
                    // WidthProvider option
                    measureBeforeMount={false}
                    // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
                    // and set `measureBeforeMount={true}`.
                    compactType={null}
                    preventCollision={true}
                    // isDroppable={true}
                >
                    {this.generateDOM()}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

function generateLayout() {
    if (typeof window !== 'undefined') { alert('함수가 호출되었습니다!') }
    return _.map(_.range(0, 25), function (item, i) {
        var y = Math.ceil(Math.random() * 4) + 1;
        return {
            x: Math.round(Math.random() * 5) * 2,
            y: Math.floor(i / 6) * y,
            w: 2,
            h: y,
            i: i.toString(),
            static: Math.random() < 0.05
        };
    });
}
