import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the jupyterlab_wrn_faas extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_wrn_faas',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension jupyterlab_wrn_faas is activated!');
  }
};

export default extension;
