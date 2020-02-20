import React, { memo } from 'react'
import PropTypes from 'prop-types'

const RadarBackground = memo(({ radius, background }) => {
    console.log('RADIOUS', radius)
    const diameter = radius * 2 * 1.5

    console.log('DIAMETER', diameter)
    // <svg scale={1.2} opacity={0.8} x={-(diameter/2)} y={-365} width={diameter} height={diameter} viewBox={'0 0 894 987'}>
    return (
        <foreignObject
            opacity={0.8}
            x={-(diameter / 2)}
            y={-(diameter * 0.455)}
            // width={diameter}
            // height={diameter}
            width={diameter}
            height={diameter}
            style={{margin: "100"}}
            // viewBox={'0 0 894 987'}
        >
            <svg
                // opacity={0.8}
                // x={-(diameter / 2)}
                // y={-(diameter * 0.455)}

                viewBox={'0 0 894 987'}
            >
                {background}
            </svg>
        </foreignObject>
    )
})

RadarBackground.displayName = 'RadarBackground'
RadarBackground.propTypes = {
    radius: PropTypes.number.isRequired,
}

export default RadarBackground
