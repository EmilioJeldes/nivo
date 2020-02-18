import React, { memo } from 'react'
import PropTypes from 'prop-types'

const RadarBackground = memo(({ radius, background }) => {
    console.log('RADIOUS', radius)
    const diameter = radius * 2 * 1.55
    console.log('DIAMETER', diameter)
    // <svg scale={1.2} opacity={0.8} x={-(diameter/2)} y={-365} width={diameter} height={diameter} viewBox={'0 0 894 987'}>
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
}

export default RadarBackground
