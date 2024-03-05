import React from 'react';
import { getScene } from './WettyScene';

export const WettyPage = () => {
  const scene = getScene();
  

  return (
    <>

      <a href="https://www.baidu.com">     baidu  /wetty   </a>{' '}

      <scene.Component model={scene} />
    </>
  );
  };
