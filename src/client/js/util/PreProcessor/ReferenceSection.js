import axios from 'axios'; // import axios from growi dependencies
import React from 'react';
import ReactDOM from 'react-dom';
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

  parseOptions(text) {
    return text.split(',').map(e => e.trim()).map(e => e.split('=')).reduce((prev, curr) => prev.set(curr[0], curr[1]), new Map());
  }

  async process(contextName, ...args) {
    const context = Object.assign(args[0]);
    const isPreview = (contextName === 'postRenderPreviewHtml');

    for (const [key, value] of Object.entries(context.refSectionMap)) {
      const ops = this.parseOptions(value.args);
      try {
        let res = await axios.get('/_api/plugin/sectionref/sections', {params: {plink: ops.get('plink'), secid: ops.get('secid')}});
        const elem = document.getElementById(key);
        if (elem) {
          ReactDOM.render(<div style={{whiteSpace: "pre-wrap"}}>{res.data.section_text}</div>, elem);
        }
      }
      catch(e) {
        continue;
      }
    }
    return;
  }
}
