import { EmbeddedScene, SceneFlexItem,SceneCSSGridLayout,PanelBuilders } from '@grafana/scenes';
import { TextMode } from '@grafana/schema/dist/esm/raw/composable/text/panelcfg/x/TextPanelCfg_types.gen';


const fetchOutput = () => {
  fetch('http://localhost:5000/execute-command?command=ls')
  .then(response => response.text())
  .then(output => {
    console.log(output);
    // 在这里处理输出
  })
  .catch(error => {
    console.error('Error calling API:', error);
  });
}

fetchOutput()
setInterval(fetchOutput, 15000);

//curl localhost:8500/v1/catalog/nodes
function Block() {
  let BlcokHtml = '<a href="http://localhost:3001/wetty"> Wetty Localhost</a>';
  return BlcokHtml;
}
let count = 0;



function BlockTemplate() {
  count ++;
  return new SceneFlexItem({
    body: PanelBuilders.text().setTitle('服务器' + count.toString()).setOption('mode', TextMode.HTML).setOption('content',Block()).build(),
    // body: PanelBuilders.timeseries().setTitle('Time series').build(),
    //           body: PanelBuilders.text().setTitle('Hello world Wetty').setOption('content', '<a href="http://localhost:3001/wetty > Wetty Localhost</a> ').build(),
  })
}
 
function PanelList() {


return [BlockTemplate(),BlockTemplate(),BlockTemplate(),BlockTemplate()]
}

export function getScene() {
  return new EmbeddedScene({
  // 根据发现的所有服务器列表来自动添加 模块！不同模块对应不同的模拟器
    body: new SceneCSSGridLayout({
      
      templateColumns:'repeat(auto-fit, minmax(45%, 1fr))',
  
      children: 
        PanelList(),
    }),
  });
}



// 
// ,
