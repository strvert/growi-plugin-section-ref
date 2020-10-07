import axios from 'axios'; // import axios from growi dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { customTagUtils, BasicInterceptor } from 'growi-commons';

export default class ReferenceSection extends BasicInterceptor {
  constructor() {
    super();
    this.previousPreviewContext = null;
  }

  isInterceptWhen(contextName) {
    return (
      contextName === 'preRenderHtml'
      || contextName === 'preRenderPreviewHtml'
    );
  }

  isProcessableParallel() {
    return false;
  }

  async process(contextName, ...args) {
    const context = Object.assign(args[0]);
    const parsedHTML = context.parsedHTML;
    const tagPattern = /secref/;
    const result = customTagUtils.findTagAndReplace(tagPattern, parsedHTML);

    context.parsedHTML = result.html;
    context.refSectionMap = result.tagContextMap;

    if (contextName === 'preRenderPreviewHtml') {
      this.unmountPreviousReactDOMs(context);
    }

    return context;
  }

  unmountPreviousReactDOMs(newContext) {
    if (this.previousPreviewContext != null) {
      Object.keys(this.previousPreviewContext.refSectionMap).forEach((domId) => {
        const elem = document.getElementById(domId);
        ReactDOM.unmountComponentAtNode(elem);
      });
    }

    this.previousPreviewContext = newContext;
  }
}
