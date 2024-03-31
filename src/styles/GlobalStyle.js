import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    
   :root {
      /* 메인 컬러 테마 */
      --main-orange: rgba(255, 107, 0, 1);
      --sub-orange: rgba(252, 163, 17, 1);
      --main-yellow: rgba(255, 195, 0, 1);
      --sub-yellow: rgba(255, 214, 10, 1);
    
      /* 무채색 */
      /* 흰색 */
      --white: rgba(255, 255, 255, 1);
      /* 회색 집합 */
      --gray-01: rgba(238,238,238, 1);
      --gray-02: rgba(220,220,220,1);
      --gray-03: rgba(204,204,204, 1);
      --gray-04: rgba(187,187,187, 1);
      --gray-05: rgba(169, 169, 169, 1);
      --gray-06: rgba(154,154,154, 1);
      --gray-07: rgba(130, 130, 130, 1);
      --gray-08: rgba(118, 118, 118, 1);
      --gray-09: rgba(97, 97, 97, 1);
      --gray-10: rgba(66, 66, 66, 1);
      /* 검정 */
      --black: rgba(0, 8, 20, 1);
   }
`;

export default GlobalStyle;
