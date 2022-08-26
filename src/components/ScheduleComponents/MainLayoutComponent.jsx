import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import styled from 'styled-components'

export const GROUPING_PANEL_VERTICAL_CELL_WIDTH = 12.5
export const LEFT_PANEL_WIDTH_SPACING = 10

const scrollingStrategy = (scrollablePart, fixedPartVertical, fixedPartHorizontal) => {
    const fixedPartVerticalRect = fixedPartVertical.getBoundingClientRect()
    const fixedPartHorizontalRect = fixedPartHorizontal
        && fixedPartHorizontal.getBoundingClientRect()

    const changeVerticalScroll = (value) => {
        // eslint-disable-next-line no-param-reassign
        scrollablePart.scrollTop += value
    }
    const changeHorizontalScroll = (value) => {
        // eslint-disable-next-line no-param-reassign
        scrollablePart.scrollLeft += value
    }

    return ({
        topBoundary: fixedPartVerticalRect.height + fixedPartVerticalRect.top,
        bottomBoundary: scrollablePart.offsetTop + scrollablePart.clientHeight,
        fixedTopHeight: fixedPartVerticalRect.height,
        leftBoundary: fixedPartHorizontalRect
            ? fixedPartHorizontalRect.width + fixedPartHorizontalRect.left
            : scrollablePart.offsetLeft,
        rightBoundary: scrollablePart.offsetLeft + scrollablePart.clientWidth,
        fixedLeftWidth: fixedPartHorizontalRect?.width,
        changeVerticalScroll,
        changeHorizontalScroll,
    })
}

const StyledDiv = styled.div`
  &.container {
    overflow-y: auto;
    position: relative;
    height: 100%;
    width: calc(100% - 4px);
    table-layout: fixed;
  }
  
  & .stickyElement {
    table-layout: fixed;
    position: sticky;
    overflow: visible;
    background: white;
  }

  & .header {
    top: 0;
    z-index: 2;
  }

  & .leftPanel {
    left: 0;
    z-index: 1;
    box-sizing: border-box;
  }

  & .ordinaryLeftPanelBorder {
    border-right: getBorder(theme);
  }

  & .brightLeftPanelBorder {
    border-right: getBrightBorder(theme);
  }

  & .ordinaryHeaderBorder {
    border-bottom: getBorder(theme);
  }

  & .brightHeaderBorder {
    border-bottom: getBrightBorder(theme);
  }

  & .dayScaleEmptyCell {
    display: flex;
    align-items: flex-end;
    width: ${props => (props.leftPanelWidth || props.calculatedLeftPanelWidth * 8 + 1) + 'px'};
    min-width: ${props => (props.leftPanelWidth || props.calculatedLeftPanelWidth * 8 + 1) + 'px'};
  }

  & .flexRow {
    display: flex;
    flex-direction: row;
  }

  & .relativeContainer {
    position: relative;
  }

  & .inlineFlex {
    display: inline-flex;
  }

  & .background {
    background: white;
  }
`

const MainLayoutComponent = React.memo(({
                                            timeScaleComponent: TimeScale,
                                            dayScaleComponent: DayScale,
                                            timeTableComponent: TimeTable,
                                            dayScaleEmptyCellComponent: DayScaleEmptyCell,
                                            groupingPanelComponent: GroupingPanel,
                                            groupingPanelSize,
                                            setScrollingStrategy,
                                            className,
                                            forwardedRef,
                                            ...restProps
                                        }) => {
    const layoutRef = React.useRef(null);
    const layoutHeaderRef = React.useRef(null);
    const leftPanelRef = React.useRef(null);

    const [isLeftBorderSet, setIsLeftBorderSet] = React.useState(false);
    const [isTopBorderSet, setIsTopBorderSet] = React.useState(false);
    const [leftPanelWidth, setLeftPanelWidth] = React.useState(0);

    React.useEffect(() => {
        const leftPanel = leftPanelRef.current;
        setScrollingStrategy(scrollingStrategy(
            layoutRef.current, layoutHeaderRef.current, leftPanel,
        ));
        // eslint-disable-next-line no-unused-expressions
        leftPanel && setLeftPanelWidth(leftPanel.getBoundingClientRect().width);
    }, [layoutRef, layoutHeaderRef, leftPanelRef, setScrollingStrategy, setLeftPanelWidth]);

    const renderTimeScale = !!TimeScale;
    const renderLeftPanel = renderTimeScale || !!groupingPanelSize;

    const calculatedGroupPanelWidth = groupingPanelSize
        ? groupingPanelSize * GROUPING_PANEL_VERTICAL_CELL_WIDTH : 0;
    const calculatedLeftPanelWidth = LEFT_PANEL_WIDTH_SPACING + calculatedGroupPanelWidth;

    const setBorders = React.useCallback((event) => {
        // eslint-disable-next-line no-bitwise
        if ((!!event.target.scrollLeft ^ isLeftBorderSet)) {
            setIsLeftBorderSet(!isLeftBorderSet);
        }
        // eslint-disable-next-line no-bitwise
        if (!!event.target.scrollTop ^ isTopBorderSet) {
            setIsTopBorderSet(!isTopBorderSet);
        }
    }, [isLeftBorderSet, isTopBorderSet]);

    return (
        <StyledDiv
            leftPanelWidth={leftPanelWidth}
            calculatedLeftPanelWidth={calculatedLeftPanelWidth}
            ref={(node) => {
                layoutRef.current = node;
                if (typeof forwardedRef === 'function') {
                    forwardedRef(node);
                } else if (forwardedRef) {
                    // eslint-disable-next-line no-param-reassign
                    forwardedRef.current = node;
                }
            }}
            className={"container"}
            onScroll={setBorders}
            {...restProps}
        >
            {/* Fix Safari sticky header https://bugs.webkit.org/show_bug.cgi?id=175029 */}
            <div>
                <div
                    ref={layoutHeaderRef}
                    className={classNames(['stickyElement', 'header', 'flexRow'])}
                >
                    <div
                        className={classNames({
                            'background': true,
                            'inlineFlex': true,
                            'ordinaryHeaderBorder': !isTopBorderSet,
                            'brightHeaderBorder': isTopBorderSet,
                        })}
                    >
                        {renderLeftPanel && (
                            <div
                                className={classNames({
                                    'stickyElement': true,
                                    'leftPanel': true,
                                    'dayScaleEmptyCell': true,
                                    'ordinaryLeftPanelBorder': !isLeftBorderSet,
                                    'brightLeftPanelBorder': isLeftBorderSet,
                                })}
                            >
                                <DayScaleEmptyCell/>
                            </div>
                        )}

                        <div>
                            <DayScale/>
                        </div>
                    </div>
                </div>

                <div className={'flexRow'}>
                    <div className={'inlineFlex'}>
                        {renderLeftPanel && (
                            <div
                                ref={leftPanelRef}
                                className={classNames({
                                    'flexRow': true,
                                    'stickyElement': true,
                                    'leftPanel': true,
                                    'ordinaryLeftPanelBorder': !isLeftBorderSet,
                                    'brightLeftPanelBorder': isLeftBorderSet,
                                })}
                            >
                                <GroupingPanel/>
                                {renderTimeScale && (
                                    <TimeScale/>
                                )}
                            </div>
                        )}
                        <div className={'relativeContainer'}>
                            <TimeTable/>
                        </div>
                    </div>
                </div>
            </div>
        </StyledDiv>
    );
});

MainLayoutComponent.propTypes = {
    // oneOfType is a workaround because withStyles returns react object
    timeScaleComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    dayScaleComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    timeTableComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    dayScaleEmptyCellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    groupingPanelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    groupingPanelSize: PropTypes.number,
    setScrollingStrategy: PropTypes.func.isRequired,
    className: PropTypes.string,
    forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

MainLayoutComponent.defaultProps = {
    groupingPanelComponent: () => null,
    timeScaleComponent: undefined,
    groupingPanelSize: 0,
    className: undefined,
    forwardedRef: undefined,
};

export default MainLayoutComponent