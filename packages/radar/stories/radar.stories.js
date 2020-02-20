import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { generateWinesTastes } from '@nivo/generators'
import { Radar } from '../src'

const commonProperties = {
    width: 900,
    height: 500,
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
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

const background =
    <g>
        <defs>
            <linearGradient id="a" x1="446.83" y1="-209.26" x2="446.83" y2="538.1" gradientTransform="translate(0 284)" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#93278f"/>
                <stop offset="1" stopColor="#2e3192"/>
            </linearGradient>
            <linearGradient id="b" x1="446.83" y1="-47.06" x2="446.83" y2="376.83" xlinkHref="#a"/>
        </defs>
        <title>grafico-vacioc</title>
        <polygon points="788.5 567.61 788.5 345.41 657.89 165.64 446.56 96.97 235.23 165.64 104.62 345.41 104.62 567.61 235.23 747.38 446.56 816.05 657.89 747.38 788.5 567.61" fill="#c15bf9" opacity="0.1" style={{isolation:"isolate"}}/>
        <g opacity="0.25">
            <path d="M446.68,894.85c138.36,0,262.68-57.45,348.24-148.74h0c-8.95-3-13.19-18.09-5.3-27.22h0c63.56-73.47,101.74-167.7,101.74-270.46S853.25,251.63,789.82,178.2l-.2-.23c-7.89-9.13-3.65-24.21,5.3-27.22C709.36,59.45,585,2,446.68,2S184.92,58.47,99.36,149.77l-.92,1c9,3,13.19,18.09,5.3,27.22l.17-.2C40.26,251.26,2,345.57,2,448.42S40.26,645.59,103.92,719.09l-.17-.2c7.89,9.13,3.65,24.21-5.3,27.22C184,837.4,308.32,894.85,446.68,894.85Z" fill="none" stroke="#5aecff" strokeMiterlimit="10" strokeWidth="2"/>
            <g opacity="0.2">
                <path d="M446.68,894.85c138.36,0,262.68-57.45,348.24-148.74h0c-8.95-3-13.19-18.09-5.3-27.22h0c63.56-73.47,101.74-167.7,101.74-270.46S853.25,251.63,789.82,178.2l-.2-.23c-7.89-9.13-3.65-24.21,5.3-27.22C709.36,59.45,585,2,446.68,2S184.92,58.47,99.36,149.77l-.92,1c9,3,13.19,18.09,5.3,27.22l.17-.2C40.26,251.26,2,345.57,2,448.42S40.26,645.59,103.92,719.09l-.17-.2c7.89,9.13,3.65,24.21-5.3,27.22C184,837.4,308.32,894.85,446.68,894.85Z" fill="none" stroke="#9ad0e1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5"/>
            </g>
            <g opacity="0.25">
                <path d="M446.68,894.85c138.36,0,262.68-57.45,348.24-148.74h0c-8.95-3-13.19-18.09-5.3-27.22h0c63.56-73.47,101.74-167.7,101.74-270.46S853.25,251.63,789.82,178.2l-.2-.23c-7.89-9.13-3.65-24.21,5.3-27.22C709.36,59.45,585,2,446.68,2S184.92,58.47,99.36,149.77l-.92,1c9,3,13.19,18.09,5.3,27.22l.17-.2C40.26,251.26,2,345.57,2,448.42S40.26,645.59,103.92,719.09l-.17-.2c7.89,9.13,3.65,24.21-5.3,27.22C184,837.4,308.32,894.85,446.68,894.85Z" fill="none" stroke="#8ac9dd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/>
            </g>
            <g opacity="0.3">
                <path d="M446.68,894.85c138.36,0,262.68-57.45,348.24-148.74h0c-8.95-3-13.19-18.09-5.3-27.22h0c63.56-73.47,101.74-167.7,101.74-270.46S853.25,251.63,789.82,178.2l-.2-.23c-7.89-9.13-3.65-24.21,5.3-27.22C709.36,59.45,585,2,446.68,2S184.92,58.47,99.36,149.77l-.92,1c9,3,13.19,18.09,5.3,27.22l.17-.2C40.26,251.26,2,345.57,2,448.42S40.26,645.59,103.92,719.09l-.17-.2c7.89,9.13,3.65,24.21-5.3,27.22C184,837.4,308.32,894.85,446.68,894.85Z" fill="none" stroke="#5cb9d2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.15"/>
            </g>
            <path d="M446.68,894.85c138.36,0,262.68-57.45,348.24-148.74h0c-8.95-3-13.19-18.09-5.3-27.22h0c63.56-73.47,101.74-167.7,101.74-270.46S853.25,251.63,789.82,178.2l-.2-.23c-7.89-9.13-3.65-24.21,5.3-27.22C709.36,59.45,585,2,446.68,2S184.92,58.47,99.36,149.77l-.92,1c9,3,13.19,18.09,5.3,27.22l.17-.2C40.26,251.26,2,345.57,2,448.42S40.26,645.59,103.92,719.09l-.17-.2c7.89,9.13,3.65,24.21-5.3,27.22C184,837.4,308.32,894.85,446.68,894.85Z" fill="none" stroke="#5cb9d2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/>
            <path d="M446.68,894.85c138.36,0,262.68-57.45,348.24-148.74h0c-8.95-3-13.19-18.09-5.3-27.22h0c63.56-73.47,101.74-167.7,101.74-270.46S853.25,251.63,789.82,178.2l-.2-.23c-7.89-9.13-3.65-24.21,5.3-27.22C709.36,59.45,585,2,446.68,2S184.92,58.47,99.36,149.77l-.92,1c9,3,13.19,18.09,5.3,27.22l.17-.2C40.26,251.26,2,345.57,2,448.42S40.26,645.59,103.92,719.09l-.17-.2c7.89,9.13,3.65,24.21-5.3,27.22C184,837.4,308.32,894.85,446.68,894.85Z" fill="none" stroke="#83c6db" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.95"/>
            <path d="M446.68,894.85c138.36,0,262.68-57.45,348.24-148.74h0c-8.95-3-13.19-18.09-5.3-27.22h0c63.56-73.47,101.74-167.7,101.74-270.46S853.25,251.63,789.82,178.2l-.2-.23c-7.89-9.13-3.65-24.21,5.3-27.22C709.36,59.45,585,2,446.68,2S184.92,58.47,99.36,149.77l-.92,1c9,3,13.19,18.09,5.3,27.22l.17-.2C40.26,251.26,2,345.57,2,448.42S40.26,645.59,103.92,719.09l-.17-.2c7.89,9.13,3.65,24.21-5.3,27.22C184,837.4,308.32,894.85,446.68,894.85Z" fill="none" stroke="#a5d4e4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25"/>
            <path d="M446.68,894.85c138.36,0,262.68-57.45,348.24-148.74h0c-8.95-3-13.19-18.09-5.3-27.22h0c63.56-73.47,101.74-167.7,101.74-270.46S853.25,251.63,789.82,178.2l-.2-.23c-7.89-9.13-3.65-24.21,5.3-27.22C709.36,59.45,585,2,446.68,2S184.92,58.47,99.36,149.77l-.92,1c9,3,13.19,18.09,5.3,27.22l.17-.2C40.26,251.26,2,345.57,2,448.42S40.26,645.59,103.92,719.09l-.17-.2c7.89,9.13,3.65,24.21-5.3,27.22C184,837.4,308.32,894.85,446.68,894.85Z" fill="none" stroke="#cde7ef" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5"/>
        </g>
        <path d="M447.26,88.9c-198.5,0-360,161.5-360,360s161.5,360,360,360,360-161.49,360-360S645.77,88.9,447.26,88.9Z" fill="none" stroke="#78afff" strokeMiterlimit="10" strokeWidth="1.02"/>
        <path d="M826.83,448.42c0-116.27-48.9-220.74-126.61-292.64h0c-2.56,7.52-15.39,11.08-23.17,4.46h0c-62.54-53.41-142.75-85.5-230.22-85.5s-167.51,32-230,85.33l-.2.17c-7.77,6.63-20.61,3.06-23.17-4.45C115.73,227.68,66.83,332.15,66.83,448.42s48.9,220.74,126.61,292.64h0c2.56-7.52,15.39-11.08,23.17-4.46l-.17-.15C279,790,359.28,822.1,446.83,822.1S614.66,790,677.22,736.45l-.17.15c7.77-6.63,20.61-3.06,23.17,4.46C777.93,669.15,826.83,564.69,826.83,448.42Zm-137,232.14h0c-60.45,67.53-146.93,109.8-243,109.8s-182.51-42.28-243-109.8h0c-3.89,6.94-19.24,10.35-26,3h0c-52-63.42-83.32-145.48-83.32-235.1s31.34-171.67,83.32-235.1c6.73-7.39,22.08-4,26,3,60.45-67.53,146.93-109.8,243-109.8s182.52,42.28,243,109.8c3.89-6.94,19.24-10.35,26-3h0c52,63.42,83.32,145.48,83.32,235.1s-31.34,171.68-83.32,235.1h0C709,690.9,693.68,687.49,689.83,680.56Z" fill="url(#a)"/>
        <path d="M802.32,658.53a425.7,425.7,0,0,0,54.51-209.22v-.89a425.74,425.74,0,0,0-55-209.17m-710,0A428.78,428.78,0,0,0,90.2,656.5l1.12,2" fill="none" strokeMiterlimit="10" strokeWidth="9.38" stroke="url(#b)"/>
    </g>

stories.add('custom background', () => (
    <Radar gridLabel={LabelComponent} {...commonProperties} backgroundComponent={background} theme={theme} displayInnerGrid={true} />)
)
