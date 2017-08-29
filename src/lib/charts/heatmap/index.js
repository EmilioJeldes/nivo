/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export const computeNodes = ({
    data,
    keys,
    getIndex,
    xScale,
    yScale,
    sizeScale,
    cellWidth,
    cellHeight,
    colorScale,
    getLabelTextColor,
}) =>
    data.reduce((acc, d) => {
        keys.forEach(key => {
            const width = sizeScale ? Math.min(sizeScale(d[key]) * cellWidth, cellWidth) : cellWidth
            const height = sizeScale
                ? Math.min(sizeScale(d[key]) * cellHeight, cellHeight)
                : cellHeight

            const node = {
                xKey: key,
                yKey: getIndex(d),
                x: xScale(key),
                y: yScale(getIndex(d)),
                width,
                height,
                value: d[key],
                color: colorScale(d[key]),
            }

            acc.push(
                Object.assign(node, {
                    labelTextColor: getLabelTextColor(node),
                })
            )
        })

        return acc
    }, [])