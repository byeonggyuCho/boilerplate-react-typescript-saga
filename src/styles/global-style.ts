/**
 * @description 전역 스타일 모음
 */

import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

/**
 * @description 여기에 font를 설정하면 폰트가 리로드되는 이슈가 생긴다.
 */

export const GlobalStyle = createGlobalStyle`
  ${reset}


  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  * {
    box-sizing: border-box;
    font-family: 'Spoqa Han Sans', 'Sans-serif' !important;
  }
  html {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-height: 100%;
    -ms-overflow-style: none;
  }


  button,
  input {
    padding:0;
    font-family: 'Spoqa Han Sans', 'Sans-serif'  ;
    outline: none;
  }
  /* IE11 */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    input::-ms-clear {
      display: none;
    }
    
    -ms-overflow-style: none;
  } 
/** COMMON **/
.hide {
  display: none !important;
}
.scrollbar-width-none {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
}
.row {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  &.nowrap {
    flex-wrap: nowrap;
  }
}
.col {
  flex-basis: 0;
  flex-grow: 1;
}
.col-6 {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 50%;
}
.align-items-start {
  align-items: flex-start !important;
}
.align-items-center {
  align-items: center !important;
}
.align-items-end {
  align-items: flex-end !important;
}
.justify-content-start {
  justify-content: flex-start !important;
}
.justify-content-start {
  justify-content: center !important;
}
.justify-content-end {
  justify-content: flex-end !important;
}
.box {
  display: flex;
  &.vertical {
    flex-direction: column;
  }
}
/** margin **/
.mb16 {
  margin-bottom: 16px;
}
.mb30 {
  margin-bottom: 32px;
}
.mb54 {
  margin-bottom: 54px;
}
.mb80 {
  margin-bottom: 80px;
}
a {
  color: inherit;
  text-decoration: none;
}
#root {
  min-height: 100%;
}
`;
