import { EmbeddedScene, SceneFlexLayout, SceneFlexItem, PanelBuilders } from '@grafana/scenes';

export function getScene() {
  return new EmbeddedScene({
    body: new SceneFlexLayout({
      children: [
        new SceneFlexItem({
          width: '100%',
          height: 300,
          body: PanelBuilders.text().setTitle('Hello world wetty').setOption('content', 'Hello world!').build(),
        }),
      ],
    }),
  });
}
