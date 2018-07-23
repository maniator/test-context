import {ServerProvider} from "./serverContext";
import React from "react";

export class ContentServerService {
  items = {};

  // @todo using the react-tree walker seems to be the breaking point...
  walkForData = async (app) => {
    const reactTreeWalker = require('react-tree-walker');
    const items = this.items;

    global.__ON_CONTENT_SERVER__ = true;

    // You provide this! See the API docs below for full details.
    async function visitor(element, instance) {
      if (instance && typeof instance.getData === 'function') {
        const data = await instance.getData();
        const id = instance.getId();

        items[id] = data;
      }

      return true;
    }

    await reactTreeWalker(app, visitor);
  };

  withProvider = (app) => {
    const providedApp = (
      <ServerProvider data={this.items}>
        { app }
      </ServerProvider>
    );

    console.log('ITEMS provided', { data: this.items });

    return providedApp;
  };

  getScriptData() {
    return `
      <script>
          window. __SOME_DATA__ = ${JSON.stringify(this.items)};
      </script>
    `;
  }
}