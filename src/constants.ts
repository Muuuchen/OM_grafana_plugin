import pluginJson from './plugin.json';

export const PLUGIN_BASE_URL = `/a/${pluginJson.id}`;

export enum ROUTES {
  HelloWorld = 'hello-world',
}

export const DATASOURCE_REF = {
  uid: 'gdev-testdata',
  type: 'testdata',
};
