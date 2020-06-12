import React from 'react';
import Plx from 'react-plx';

/**
 *
 * @param {*} options
 * @param level int
 * @return parallaxData
 */
export const makeHomeParallaxData = (direction, order, level) => {
  let startOffset = level === 'top' ? 400 : 300;
  startOffset = startOffset + 50 * (order - 1);
  let opacity;
  switch (order) {
    case 1:
      opacity = 0.2;
      break;
    case 2:
      opacity = 0.3;
      break;
    case 3:
      opacity = 0.5;
      break;
    case 4:
      opacity = 1;
      break;
    default:
      opacity = 1;
  }
  const startDirectionOffset = direction === 'right' ? 50 : -50;
  return [
    {
      start: 'self',
      startOffset,
      duration: 50,
      properties: [
        {
          startValue: startDirectionOffset,
          endValue: 0,
          property: 'translateX',
          unit: '%',
        },
        {
          startValue: 0,
          endValue: opacity,
          property: 'opacity',
        },
      ],
    },
  ];
};

export const makeParallaxHomeSection = (options) => {
  const { direction, level, imgUrl } = options;
  const arr = direction === 'right' ? [4, 3, 2, 1] : [1, 2, 3, 4];
  return (
    <div className={`home-page-div parallax-${level}`}>
      {arr.map((order) => {
        return (
          <Plx
            key={`${imgUrl}-${order}`}
            className="MyAwesomeParallax"
            parallaxData={makeHomeParallaxData(direction, order, level)}
          >
            <img className={`${direction}-${order}`} src={imgUrl} />
          </Plx>
        );
      })}
    </div>
  );
};

export const parallaxDataRight1 = [
  {
    start: 'self',
    startOffset: 420,
    duration: 50,
    properties: [
      {
        startValue: 50,
        endValue: 0,
        property: 'translateX',
        unit: '%',
      },
      {
        startValue: 0,
        endValue: 0.2,
        property: 'opacity',
      },
    ],
  },
];
export const parallaxDataRight2 = [
  {
    start: 'self',
    startOffset: 470,
    duration: 50,
    properties: [
      {
        startValue: 50,
        endValue: 0,
        property: 'translateX',
        unit: '%',
      },
      {
        startValue: 0,
        endValue: 0.3,
        property: 'opacity',
      },
    ],
  },
];
export const parallaxDataRight3 = [
  {
    start: 'self',
    startOffset: 520,
    duration: 50,
    properties: [
      {
        startValue: 50,
        endValue: 0,
        property: 'translateX',
        unit: '%',
      },
      {
        startValue: 0,
        endValue: 0.5,
        property: 'opacity',
      },
    ],
  },
];
export const parallaxDataRight4 = [
  {
    start: 'self',
    startOffset: 570,
    duration: 100,
    properties: [
      {
        startValue: 50,
        endValue: 0,
        property: 'translateX',
        unit: '%',
      },
      {
        startValue: 0,
        endValue: 1,
        property: 'opacity',
      },
    ],
  },
];
/*
const parallaxDataLeft1 = [
    {
        start: 'self',
        startOffset: 100,
        duration: 50,
        properties: [
            {
                startValue: -50,
                endValue: 0,
                property: 'translateX',
                unit: '%',
            },
            {
                startValue: 0,
                endValue: 0.2,
                property: 'opacity',
            },
        ],
    },
];
const parallaxDataLeft2 = [
    {
        start: 'self',
        startOffset: 200,
        duration: 50,
        properties: [
            {
                startValue: -50,
                endValue: 0,
                property: 'translateX',
                unit: '%',
            },
            {
                startValue: 0,
                endValue: 0.3,
                property: 'opacity',
            },
        ],
    },
];
const parallaxDataLeft3 = [
    {
        start: 'self',
        startOffset: 300,
        duration: 50,
        properties: [
            {
                startValue: -50,
                endValue: 0,
                property: 'translateX',
                unit: '%',
            },
            {
                startValue: 0,
                endValue: 0.5,
                property: 'opacity',
            },
        ],
    },
];
const parallaxDataLeft4 = [
    {
        start: 'self',
        startOffset: 400,
        duration: 50,
        properties: [
            {
                startValue: -50,
                endValue: 0,
                property: 'translateX',
                unit: '%',
            },
            {
                startValue: 0,
                endValue: 1,
                property: 'opacity',
            },
        ],
    },
];
*/
