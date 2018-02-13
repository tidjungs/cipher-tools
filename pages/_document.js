import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet, injectGlobal } from 'styled-components';

injectGlobal`
  @font-face {
    font-family: 'Roboto';
    src: url('/static/Roboto-Regular.ttf');
  }
  
  body, textarea {
    font-family: 'Roboto';
  }
`;

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          <title>Cipher Tools</title>
          <link rel="stylesheet" href="static/slider.css" />
          <link rel="stylesheet" href="static/toggle.css" />
          <script defer src="/static/fontawesome/js/fontawesome-all.js" />
          {this.props.styleTags}
        </Head>
        <body style={{ margin: 0 }}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
