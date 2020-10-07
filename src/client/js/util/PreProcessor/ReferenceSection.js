import axios from 'axios'; // import axios from growi dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { customTagUtils } from "growi-commons";
import { BasicInterceptor } from 'growi-commons';

export default class ReferenceSection extends BasicInterceptor {
  constructor(appContainer) {
    super();
    this.appContainer = appContainer;
  }

  async reqSec(plink, secid) {
    return ;
  }

  isInterceptWhen(contextName) {
    return (
      contextName === 'postRenderHtml'
      || contextName === 'postRenderPreviewHtml'
    );
  }

  async process(contextName, ...args) {
    const context = Object.assign(args[0]);
    const isPreview = (contextName === 'postRenderPreviewHtml');

    const pattern = /plink=(.+),secid=(.+)/;
    for (const [key, value] of Object.entries(context.refSectionMap)) {
      const m = value.args.match(pattern);
      try {
        let res = await axios.get('/_api/plugin/sectionref/sections', {params: {plink: m[1], secid: m[2]}});
        const elem = document.getElementById(key);
        if (elem) {
          ReactDOM.render(<p style={{whiteSpace: "pre-wrap"}}>{res.data.section_text}</p>, elem);
        }
      }
      catch(e) {
        continue;
      }
    }
    return;
  }
}
