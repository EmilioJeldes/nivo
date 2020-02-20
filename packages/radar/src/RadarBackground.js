import React, { memo } from 'react'
import PropTypes from 'prop-types'

const RadarBackground = memo(({ radius, background }) => {
    const diameter = radius * 2 * 1.55
    return (
        <svg
            opacity={0.8}
            x={-(diameter / 2)}
            y={-(diameter * 0.455)}
            width={diameter}
            height={diameter}
            viewBox={'0 0 894 987'}
        >
            {background}
        </svg>
    )
})

RadarBackground.displayName = 'RadarBackground'
RadarBackground.propTypes = {
    radius: PropTypes.number.isRequired,
    background: PropTypes.object,
}

export default RadarBackground
