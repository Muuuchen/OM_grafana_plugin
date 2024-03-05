import { EmbeddedScene, SceneFlexItem,SceneCSSGridLayout,PanelBuilders } from '@grafana/scenes';
import { TextMode } from '@grafana/schema/dist/esm/raw/composable/text/panelcfg/x/TextPanelCfg_types.gen';


// const fetchOutput = async () => {
//   try {
//     const response = await fetch('http://localhost:5000/execute-command?command=ls',{
//     method: "GET",    
//     headers: {
//           "access-control-allow-origin" : "*",
//           "Content-type": "application/json; charset=UTF-8"
//         }
//     });

//     if (!response.ok) {
//       throw new Error(`请求失败，状态码: ${response.status}`);
//     }

//     const output = await response.text();
//     console.log(output);
//     // 在这里处理输出
//   } catch (error) {
//     console.error('Error calling API:', error.message);
//   }
// };

// 使用 async/await 确保等待异步操作完成
// fetchOutput();
interface MyData {
  ID: string;
  Node: string;
  Address: string;
  Datacenter: string;
}

const parseTextData = (textData: string): MyData[] | null => {
  try {
    const jsonData: MyData[] = JSON.parse(textData);
    console.log(jsonData);
    if (!Array.isArray(jsonData)) {
      console.error('Parsed data is not an array.');
      return null;
    }

    const extractedData = extractData(jsonData);
    console.log(extractedData);
    return extractedData;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
};

const extractData = (jsonArray: MyData[]) => {
  const result = jsonArray.map((item) => {
    const idMatch = item.ID.match(/(.*)/);
    const nodeNameMatch = item.Node.match(/(.*)/);
    const datacenterMatch = item.Datacenter.match(/(.*)/);
    const ipAddressMatch = item.Address.match(/(.*)/);

    return {
      ID: idMatch ? idMatch[1] : '',
      Node: nodeNameMatch ? nodeNameMatch[1] : '',
      Datacenter: datacenterMatch ? datacenterMatch[1] : '',
      Address: ipAddressMatch ? ipAddressMatch[1] : '',
    };
  });

  return result;
};



const fetchOutput = () => {
   fetch('http://localhost:5000/execute-command?command=curl%20localhost:8500/v1/catalog/nodes',{
   method: 'GET', 
   headers: {
                "access-control-allow-origin" : "*",
                "Content-type": "application/json; charset=UTF-8"
              }
  })
  .then(response => response.text())
  .then(output => {
    // console.log(output);
    // 在这里处理输出
    return output;
  })
  .then(parseTextData)
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

  count =0;
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
