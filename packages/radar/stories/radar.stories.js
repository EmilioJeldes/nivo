import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { generateWinesTastes } from '@nivo/generators'
import { Radar } from '../src'

const commonProperties = {
    width: 900,
    height: 600,
    margin: { top: 80, right: 80, bottom: 80, left: 80 },
    ...generateWinesTastes(),
    indexBy: 'taste',
    animate: true,
}

const curveOptions = ['linearClosed', 'basisClosed', 'catmullRomClosed', 'cardinalClosed']

const stories = storiesOf('Radar', module)

stories.addDecorator(withKnobs)

stories.add('default', () => <Radar {...commonProperties} />)

stories.add('with custom curve', () => (
    <Radar {...commonProperties} gridShape="linear" curve="catmullRomClosed" />
))

stories.add('linear grid shape', () => (
    <Radar
        {...commonProperties}
        gridShape="linear"
        curve={select('curve', curveOptions, 'linearClosed')}
    />
))

stories.add('with dot label', () => (
    <Radar
        {...commonProperties}
        curve={select('curve', curveOptions, 'linearClosed')}
        gridShape="linear"
        dotSize={10}
        dotBorderColor="#fff"
        dotBorderWidth={2}
        enableDotLabel={true}
        gridLabelOffset={36}
    />
))

stories.add('abusing dots', () => (
    <Radar
        {...commonProperties}
        curve={select('curve', curveOptions, 'catmullRomClosed')}
        dotSize={32}
        enableDotLabel={true}
        dotLabelYOffset={3}
        gridLabelOffset={36}
    />
))

const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
    <rect
        transform={`rotate(45) translate(${size * -0.5}, ${size * -0.5})`}
        width={size}
        height={size}
        fill={color}
        strokeWidth={borderWidth}
        fillOpacity={1}
        stroke={borderColor}
    />
)

stories.add('custom dot symbol', () => (
    <Radar
        {...commonProperties}
        curve={select('curve', curveOptions, 'catmullRomClosed')}
        dotSize={18}
        dotSymbol={CustomSymbol}
        dotBorderWidth={1}
        dotBorderColor="inherit:darker(0.3)"
        gridLabelOffset={36}
    />
))

stories.add('with formatted values', () => (
    <Radar
        {...commonProperties}
        tooltipFormat={value =>
            `${Number(value).toLocaleString('ru-RU', {
                minimumFractionDigits: 2,
            })} ₽`
        }
    />
))

stories.add('with formatted values per key', () => (
    <Radar
        {...commonProperties}
        tooltipFormat={(value, key) => {
            if (key === 'syrah') {
                return value + ' BitCoins'
            } else {
                return `${Number(value).toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                })} ₽`
            }
        }}
    />
))

const LabelComponent = ({ id, anchor }) => (
    <g transform={`translate(${anchor === 'end' ? -60 : anchor === 'middle' ? -30 : 0}, -20)`}>
        <text>{id}</text>
        <text
            y={24}
            style={{
                fontSize: 24,
                fontWeight: 'bold',
                fill: '#3a9896',
            }}
        >
            +{Math.round(Math.random() * 100)}%
        </text>
    </g>
)

stories.add('custom label component', () => (
    <Radar {...commonProperties} gridLabel={LabelComponent} />
))

const theme = {
    grid: {
        line: {
            stroke: 'rgba(0,212,255,.3)',
            strokeWidth: 2,
        },
    },
    crosshair: {
        line: {
            stroke: 'rgba(0,212,255,1)',
            strokeWidth: 2,
            strokeDasharray: '0',
        },
        staticLine: {
            stroke: 'rgba(0,212,255,.3)',
            strokeWidth: 2,
            strokeDasharray: '0',
        },
    },
}

stories.add('display inner grid', () => (
    <Radar {...commonProperties} theme={theme} displayInnerGrid={true} />
))

// prettier-ignore
const background =
    <g>
        <defs>
            <linearGradient id="a" x1="446.83" y1="-209.26" x2="446.83" y2="538.1" gradientTransform="translate(0 284)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#f13a00"/>
                <stop offset="1" stopColor="#eeba37"/>
            </linearGradient>
        </defs>
        <path d="M826.83,448.42c0-116.27-48.9-220.74-126.61-292.64h0c-2.56,7.52-15.39,11.08-23.17,4.46h0c-62.54-53.41-142.75-85.5-230.22-85.5s-167.51,32-230,85.33l-.2.17c-7.77,6.63-20.61,3.06-23.17-4.45C115.73,227.68,66.83,332.15,66.83,448.42s48.9,220.74,126.61,292.64h0c2.56-7.52,15.39-11.08,23.17-4.46l-.17-.15C279,790,359.28,822.1,446.83,822.1S614.66,790,677.22,736.45l-.17.15c7.77-6.63,20.61-3.06,23.17,4.46C777.93,669.15,826.83,564.69,826.83,448.42Zm-137,232.14h0c-60.45,67.53-146.93,109.8-243,109.8s-182.51-42.28-243-109.8h0c-3.89,6.94-19.24,10.35-26,3h0c-52-63.42-83.32-145.48-83.32-235.1s31.34-171.67,83.32-235.1c6.73-7.39,22.08-4,26,3,60.45-67.53,146.93-109.8,243-109.8s182.52,42.28,243,109.8c3.89-6.94,19.24-10.35,26-3h0c52,63.42,83.32,145.48,83.32,235.1s-31.34,171.68-83.32,235.1h0C709,690.9,693.68,687.49,689.83,680.56Z" fill="url(#a)"/>
    </g>

stories.add('custom background, with inner grid and custom label', () => (
    <Radar
        gridLabel={LabelComponent}
        {...commonProperties}
        backgroundComponent={background}
        theme={theme}
        displayInnerGrid={true}
    />
))
