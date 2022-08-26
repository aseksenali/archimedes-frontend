import * as React from 'react'
import { styled } from '@mui/material/styles'
import classNames from 'clsx'
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui'
import '../../../helpers/stringHelper'

const XS_LAYOUT_WIDTH = 500
const SMALL_LAYOUT_MEDIA_QUERY = `@media (max-width: ${ XS_LAYOUT_WIDTH }px)`

const PREFIX = 'VerticalAppointment'

export const classes = {
    title: `${ PREFIX }-title`,
    textContainer: `${ PREFIX }-textContainer`,
    middleContainer: `${ PREFIX }-middleContainer`,
    time: `${ PREFIX }-time`,
    content: `${ PREFIX }-content`,
    shortContent: `${ PREFIX }-shortContent`,
    shortContainer: `${ PREFIX }-shortContainer`,
    shortTime: `${ PREFIX }-shortTime`,
    shortTitle: `${ PREFIX }-shortTitle`,
    container: `${ PREFIX }-container`,
    recurringContainer: `${ PREFIX }-recurringContainer`,
    imageContainer: `${ PREFIX }-imageContainer`,
    image: `${ PREFIX }-image`,
}

const StyledDiv = styled('div')(({
                                     theme: { palette, spacing },
                                 }) => ({
    [`& .${ classes.title }`]: {
        fontWeight: 'bold',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        paddingBottom: '.3em',
        whiteSpace: 'nowrap',
    },
    [`& .${ classes.textContainer }`]: {
        lineHeight: 1,
        whiteSpace: 'pre-wrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    [`& .${ classes.middleContainer }`]: {
        lineHeight: '0.9!important',
    },
    [`& .${ classes.time }`]: {
        display: 'inline-block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    [`&.${ classes.content }`]: {
        color: palette.common.white,
        padding: spacing(0.5, 1),
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'flex',
        [`${ SMALL_LAYOUT_MEDIA_QUERY }`]: {
            paddingLeft: spacing(0.5),
            paddingRight: spacing(0.5),
        },
    },
    [`&.${ classes.shortContent }`]: {
        padding: spacing(0.25, 1),
        [`${ SMALL_LAYOUT_MEDIA_QUERY }`]: {
            paddingLeft: spacing(0.5),
            paddingRight: spacing(0.5),
        },
    },
    [`& .${ classes.shortContainer }`]: {
        display: 'flex',
    },
    [`& .${ classes.shortTime }`]: {
        textOverflow: 'initial',
        flexShrink: 0,
    },
    [`& .${ classes.shortTitle }`]: {
        flexShrink: 3,
    },
    [`& .${ classes.container }`]: {
        width: '100%',
    },
    [`& .${ classes.recurringContainer }`]: {
        width: `calc(100% - ${ spacing(2) })`,
    },
    [`& .${ classes.imageContainer }`]: {
        width: spacing(2),
        height: spacing(2),
    },
    [`& .${ classes.image }`]: {
        width: '100%',
        height: '100%',
    },
}))

export const AppointmentContentComponent = ({
                                                data,
                                                children,
                                                formatDate,
                                                durationType,
                                            }: Appointments.AppointmentContentProps) => {
    const repeat = !!data.rRule
    const isShortHeight = durationType === 'short'
    const isMiddleHeight = durationType === 'middle'
    return (
        <StyledDiv
            className={ classNames({
                [classes.content]: true,
                [classes.shortContent]: isShortHeight || isMiddleHeight,
            }) }
        >
            { children || (
                <React.Fragment>
                    <div className={ classNames({
                        [classes.container]: !repeat,
                        [classes.recurringContainer]: repeat,
                    }) }
                    >
                        { isShortHeight ? (
                            <div className={ classes.shortContainer }>
                                <div className={ classNames(classes.title, classes.shortTitle) }>
                                    { data.title && data.title.asNameAbbreviation() }
                                </div>
                                <div className={ classNames(classes.time, classes.shortTime) }>
                                    { formatDate(data.startDate, { hour: 'numeric', minute: 'numeric' }) }
                                </div>
                            </div>
                        ) : (
                            <React.Fragment>
                                <div className={ classes.title }>
                                    { data.title && data.title.asNameAbbreviation() }
                                </div>
                                <div
                                    className={ classNames({
                                        [classes.textContainer]: true,
                                        [classes.middleContainer]: isMiddleHeight,
                                    }) }
                                >
                                    <div className={ classes.time }>
                                        { formatDate(data.startDate, { hour: 'numeric', minute: 'numeric' }) }
                                    </div>
                                    <div className={ classes.time }>
                                        &nbsp;
                                        -
                                        &nbsp;
                                    </div>
                                    <div className={ classes.time }>
                                        { formatDate(data.endDate, { hour: 'numeric', minute: 'numeric' }) }
                                    </div>
                                </div>
                            </React.Fragment>
                        ) }
                    </div>
                </React.Fragment>
            ) }
        </StyledDiv>
    )
}

export default AppointmentContentComponent