import baseStyled, {
  css,
  CSSProp,
  ThemedStyledInterface,
  FlattenSimpleInterpolation,
} from 'styled-components';
import { BackQuoteArgs } from './styled';

const calcRem = (size: number) => `${size / 16}rem`;

// media size
const sizes: { [key: string]: number } = {
  mobile: 320,
  tablet: 640,
  desktop: 1024,
};

interface Media {
  mobile: (...args: BackQuoteArgs) => CSSProp | undefined;
  tablet: (...args: BackQuoteArgs) => CSSProp | undefined;
  desktop: (...args: BackQuoteArgs) => CSSProp | undefined;
  ie: (...args: BackQuoteArgs) => CSSProp | undefined;
}

const media: Media = {
  mobile: (...args: BackQuoteArgs) => undefined,
  tablet: (...args: BackQuoteArgs) => undefined,
  desktop: (...args: BackQuoteArgs) => undefined,
  ie: (...args: BackQuoteArgs) => undefined,
};

Object.keys(sizes).reduce((acc: Media, label: string) => {
  switch (label) {
    case 'desktop':
      acc.desktop = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (min-width: ${sizes.desktop}px) {
            ${args}
          }
        `;
      break;
    case 'tablet':
      acc.tablet = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.desktop}px) and (min-width: ${sizes.tablet}px) {
            ${args}
          }
        `;
      break;
    case 'mobile':
      acc.mobile = (...args: BackQuoteArgs) => {
        // TODO: 정리필요
        const [templateLiteralArr, ...tagValueArr] = args;
        let result = '';
        (templateLiteralArr as string[]).forEach((str, index) => {
          result += str + tagValueArr[index];
        });

        return css`
          @media only screen and (max-width: ${sizes.tablet}px) {
            ${result}
          }
        `;
      };
      break;
    case 'ie':
      acc.ie = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (-ms-high-contrast: active),
            (-ms-high-contrast: none) {
            ${args}
          }
        `;
      break;
    default:
      break;
  }
  return acc;
}, media);

const colors = {
  white: ['#ffffff', '#dee2e6'],
  gray: ['#edeff1', '#f8f8f8', '#d8d8d8', '#979797', '#b1b1b5'],
  black: [
    '#1e1e2c',
    '#1d1d2b',
    'rgba(30,30,44, 0.6);',
    'rgba(30,30,44, 0.35);',
    'rgba(30,30,44, 0.05);',
  ],
  blue: ['#2394ce', '#85C4E7', 'rgba(133, 196, 231, 0.12)'],
  red: ['#ed4035'],
  yellow: ['#fede00', '#f3ac13'],
  orange: ['#f3ac13'],
};

const secondaryColors = {};

// 8배수
const BASE_SPACING = 8;

const spacing = (multiple: number) =>
  `
    ${calcRem(BASE_SPACING * multiple)}
  `;
const fontSizes = {
  small: `
      font-size: ${calcRem(12)};
      letter-spacing: -0.5px;
      line-height: auto;    
  `,
  base: `
      font-size: ${calcRem(14)};
      letter-spacing: -0.5px;
      line-height: auto;    
  `,
  lg: `
      font-size: ${calcRem(16)};
      letter-spacing: 0px;
      line-height: auto;    
  `,
  xl: `
      font-size: ${calcRem(20)};
      letter-spacing: 0px;
      line-height: auto;    
  `,
  xxl: `
      font-size: ${calcRem(32)};
      letter-spacing: 0px;
      line-height: auto;    
  `,
};

const theme = {
  colors,
  fontSizes,
  secondaryColors,
  media,
  dark: {
    mainBackground: `#333`,
    // neutral color
    title: `rgba(255,255,255,0.85)`,
    primaryText: `rgba(255,255,255,0.65)`,
    secondaryText: `rgba(255,255,255,0.45)`,
    disable: `rgba(255,255,255,0.25)`,
    border: `rgba(255,255,255,0.15)`,
    divider: `rgba(255,255,255,0.06)`,
    background: `rgba(255,255,255,0.04)`,
    tableHeader: `rgba(255,255,255,0.02)`,
    // point-color
  },
  light: {
    mainBackground: `#fff`,
    // neutral color
    title: `rgba(0, 0, 0, 0.85)`,
    primaryText: `rgba(0, 0, 0, 0.75)`,
    secondaryText: `rgba(0, 0, 0, 0.45)`,
    disable: `rgba(0, 0, 0, 0.25)`,
    border: `rgba(0, 0, 0, 0.15)`,
    divider: `rgba(0, 0, 0, 0.06)`,
    background: `rgba(0, 0, 0, 0.04)`,
    tableHeader: `rgba(0, 0, 0, 0.02)`,
    // point-color
  },
  spacing,
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme;
