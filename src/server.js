import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { ContentServerService } from "@wework/content-utils/dist/server";
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const context = {};
    const contentService = new ContentServerService();
    const sheet = new ServerStyleSheet();
    const app = (
      <StaticRouter context={context} location={req.url}>
        <App/>
      </StaticRouter>
    );

    try {
      await contentService.walkForData(app);
    } catch (error) {
      console.log('THERE WAS A MARKUP ERROR', error);
    }

    const markup = renderToString(
      sheet.collectStyles(
        contentService.withProvider(
          app
        )
      )
    );

    const helmet = Helmet.renderStatic();

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''}
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${contentService.getScriptData()}
        <style>
        @font-face {
          font-family: 'Apercu';
          src: url(https://www.wework.com/public/fonts/apercu_light.651a68d903c38198501340bfd6ebb6c3.eot);
          src: url(https://www.wework.com/public/fonts/apercu_light.651a68d903c38198501340bfd6ebb6c3.eot) format("embedded-opentype"), url(https://www.wework.com/public/fonts/apercu_light.35b4712f12a9508a21a199572545a3fe.woff) format("woff"), url(https://www.wework.com/public/fonts/apercu_light.0f2077afd634a610561a557bc0031ec6.ttf) format("opentype");
          font-weight: normal;
          font-style: normal; }
        
        @font-face {
          font-family: 'Apercu';
          src: url(https://www.wework.com/public/fonts/apercu_medium.db2a9fb0f6d1a46bf6349161d51f7030.eot);
          src: url(https://www.wework.com/public/fonts/apercu_medium.db2a9fb0f6d1a46bf6349161d51f7030.eot) format("embedded-opentype"), url(https://www.wework.com/public/fonts/apercu_medium.f6ed8d62923dcb08199beb0ba8d72ce4.woff) format("woff"), url(https://www.wework.com/public/fonts/apercu_medium.c0c2b3bb9f3fa41d16d44e6bccb5cfdd.ttf) format("opentype");
          font-weight: 600;
          font-style: normal; }
        
        @font-face {
          font-family: 'Apercu';
          src: url(https://www.wework.com/public/fonts/apercu_medium.db2a9fb0f6d1a46bf6349161d51f7030.eot);
          src: url(https://www.wework.com/public/fonts/apercu_medium.db2a9fb0f6d1a46bf6349161d51f7030.eot) format("embedded-opentype"), url(https://www.wework.com/public/fonts/apercu_medium.f6ed8d62923dcb08199beb0ba8d72ce4.woff) format("woff"), url(https://www.wework.com/public/fonts/apercu_medium.c0c2b3bb9f3fa41d16d44e6bccb5cfdd.ttf) format("opentype");
          font-weight: bold;
          font-style: normal; }
        
        @font-face {
          font-family: 'Apercu';
          src: url(https://www.wework.com/public/fonts/apercu_bold.fd7b76069861640e5270d0529813644a.eot);
          src: url(https://www.wework.com/public/fonts/apercu_bold.fd7b76069861640e5270d0529813644a.eot) format("embedded-opentype"), url(https://www.wework.com/public/fonts/apercu_bold.49daf60d0b4958c9eb667f43e7296b5a.woff) format("woff"), url(https://www.wework.com/public/fonts/apercu_bold.907b89664727168376cdd4c14ff95b81.ttf) format("opentype");
          font-weight: 700;
          font-style: normal; }
        </style>
        ${sheet.getStyleTags()}      
        ${process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`}
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });

export default server;
