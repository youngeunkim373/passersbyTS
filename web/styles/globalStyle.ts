import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
/*-------------------------------------------*/
/*                    TAG                    */
/*-------------------------------------------*/
    html,
    body {
      background: ${({ theme }) => theme.global.layout.bgColor};
      color: ${({ theme }) => theme.global.layout.color};
      font-family: "ibmLight";
      font-size: 17px;
      font-weight: bold;
      height: 100%;
      margin: 0;
      padding: 0;
      position: relative;
      width: 100vw;
    }

    main {
      margin-bottom: 100px;
      margin-top: 70px;
    }    

    footer {
      bottom: 0;
      color: #cccccc;
      font-family: ibmRegular;
      font-size: 20px;
      font-weight: normal;
      height: 150px;
      left: 0;
      min-width: 700px;
      position: absolute;
      text-align: center;
      white-space: nowrap;
      width: 100%;
    }
    
    button {
      background: transparent;
      border: 0;
      cursor: pointer;
    }

    a {
      cursor: pointer;
      text-decoration: none;
    }    
    
/*-------------------------------------------*/
/*                    ID                     */
/*-------------------------------------------*/
  #root {
    height: 100%;
  }
  
  #wrapper {
    min-height: calc(100% - 150px);
    padding-bottom: 150px; /* footer 높이 */
    position: relative;
  }
  
  #content {
    min-height: 100%;
    overflow: hidden;
  }
  
  #page {
    height: 100%;
    margin: 0 auto;
    min-width: "700px";
    padding-bottom: 150px;
    padding-top: 100px;
  }

  #narrow-page {
    height: 100%;
    margin: 0 auto;
    padding-bottom: 150px;
    padding-top: 100px;
    width: 300px;
  }  

  #list-page {
    min-width: 700px;
    height: 100%;
    margin: 0 auto;
    padding-top: 100px;
    padding-bottom: 150px;
    width:70vw;
  }

  #editor-page {
    height: 100%;
    margin: 0 auto;
    max-width: 700px;
    min-width: 500px;   
    padding-bottom: 150px; 
    padding-top: 100px;
    width: 50vw;
  }

/*-------------------------------------------*/
/*                  EDITOR                   */
/*-------------------------------------------*/ 
.quill-container {
  background: ${({ theme }) => theme.global.component.bgColor};
  color: ${({ theme }) => theme.global.component.color};
  height: 100%;
}

.quill-container .ql-toolbar {
  border: ${({ theme }) => theme.global.component.border};
}

.quill-container.isShow .ql-toolbar {
  display: none;
}

.quill-container .ql-container {
  border: ${({ theme }) => theme.global.component.border};
}

.quill-container.isShow .ql-container {
  border: none;
}

.quill-container.isShow .ql-editor {
  height: 100%;
}

.editor-height {
  height: 100%;
  min-height: 350px;
}

.ql-editor {
  height: 350px;
  overflow: auto;
  font-family: "ibmLight";
  font-size: 19px;
  font-weight: normal;
}
`;
