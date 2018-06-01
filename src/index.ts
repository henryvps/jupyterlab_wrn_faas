import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  each
} from '@phosphor/algorithm';

import {
  PanelLayout, TabBar, Widget
} from '@phosphor/widgets';

import {
  ToolbarButton, Toolbar
} from '@jupyterlab/apputils';


import {
  ServerConnection
} from '@jupyterlab/services';





import '../style/index.css';




const TOOLBAR_CLASS = 'jp-FileBrowser-toolbar';



class FaaSWidget extends Widget {
    /**
     * Construct a new xkcd widget.
     */
    constructor() {
        super();
        this.settings = ServerConnection.makeSettings();

        this.id = 'xkcd-jupyterlab';
        this.title.label = 'FaaS';
        this.title.closable = true;
        this.addClass('jp-xkcdWidget');

        this.img = document.createElement('img');
        this.img.className = 'jp-xkcdCartoon';
        this.node.appendChild(this.img);

        this.img.insertAdjacentHTML('afterend',
            `<div class="jp-xkcdAttribution">
        <a href="https://creativecommons.org/licenses/by-nc/2.5/" class="jp-xkcdAttribution" target="_blank">
          <img src="https://licensebuttons.net/l/by-nc/2.5/80x15.png" />
        </a>
      </div>`
        );
        
        this.toolbar = new Toolbar<Widget>();
        
        // Add a launcher toolbar item.
        let launcher = new ToolbarButton({
          className: 'jp-AddIcon',
          onClick: () => {
            //return createLauncher(commands, widget);
            //app.shell.addToMainArea(widget);
            console.log(this);
          }
        });
        launcher.addClass('jp-MaterialIcon');
    
        
        this.toolbar.addItem('spacer', Toolbar.createSpacerItem());
        this.toolbar.addItem('launcher', launcher);
        this.toolbar.addClass(TOOLBAR_CLASS);
        let layout = new PanelLayout();
        layout.addWidget(this.toolbar);
        this.layout = layout;

    }

    /**
    * The toolbar used by the file browser.
    */
    readonly toolbar: Toolbar<Widget>;


    /**
     * The server settings associated with the widget.
     */
    readonly settings: ServerConnection.ISettings;

    /**
     * The image element associated with the widget.
     */
    readonly img: HTMLImageElement;

    /**
     * Handle update requests for the widget.
     
    onUpdateRequest(msg: Message): void {
        ServerConnection.makeRequest({url: 'https://egszlpbmle.execute-api.us-east-1.amazonaws.com/prod'}, this.settings).then(response => {
            this.img.src = response.data.img;
            this.img.alt = response.data.title;
            this.img.title = response.data.alt;
        });
    }
    */
};














/**
 * Initialization data for the jupyterlab_wrn_faas extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab_wrn_faas',
  autoStart: true,

  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension jupyterlab_wrn_faas is activated!');
    //let demoWidget = new ContentWidget('demo');

    const { shell } = app;
    
    const tabs = new TabBar<Widget>({ orientation: 'vertical' });
    const header = document.createElement('header');
    const wrnElement = document.createElement('element');
    wrnElement.textContent = 'Warren Element';
    wrnElement.title = "Warren Element Title";
    
    console.log(wrnElement)

    // restorer.add(tabs, 'tab-manager');
    tabs.id = 'tab-manager';
    tabs.title.label = 'FaaS';
    header.textContent = 'FaaS';

    console.log(tabs);
    console.log(tabs.node);
    tabs.node.insertBefore(header, tabs.contentNode);
    //app.shell.addToMainArea(demoWidget);
    console.log(shell.widgets('main'));




    

    let widget = new FaaSWidget();
    
    shell.addToLeftArea(widget, { rank: 100 });
    
    console.log(widget);
    



    app.restored.then(() => {
      const populate = () => {
        //tabs.clearTabs();
        //each(shell.widgets('main'), widget => { tabs.addTab(widget.title); });
        each(shell.widgets('main'), widget => { console.log(widget.title); });

      };

      // Connect signal handlers.
      shell.layoutModified.connect(() => { populate(); });
      tabs.tabActivateRequested.connect((sender, tab) => {
        shell.activateById(tab.title.owner.id);
      });
      tabs.tabCloseRequested.connect((sender, tab) => {
        tab.title.owner.close();
      });

      // Populate the tab manager.
      populate();
    });



  }
};

export default extension;
