import * as React from 'react';
import {styled} from '@mui/material/styles';
import * as PropTypes from 'prop-types';

const StyledDiv = styled('div')`
  margin-left: 4px;

  &:first-of-type {
    margin-left: 0;
  }
  margin-top: 2em;
  
  display: flex;
  flex-direction: column;
  height: 80.8%;
  color: var(--primary-color);
`;

const RootComponent = ({
                           navigatorText,
                           rootRef,
                           onVisibilityToggle,
                           onNavigate,
                           className,
                           ...restProps
                       }) => {

    return (<StyledDiv
        ref={rootRef}
        {...restProps}
    >
    </StyledDiv>);
};

RootComponent.propTypes = {
    rootRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    navigatorText: PropTypes.string,
};

RootComponent.defaultProps = {
    navigatorText: '',
};

export default RootComponent;
