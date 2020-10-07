// import FooBarPreRenderInterceptor from './client/js/util/Interceptor/FooBarPreRenderInterceptor';
// import FooBarPostRenderInterceptor from './client/js/util/Interceptor/FooBarPostRenderInterceptor';
import DefineSection from 'growi-plugin-section-ref/src/client/js/util/PreProcessor/DefineSection';
import PreReferenceSection from 'growi-plugin-section-ref/src/client/js/util/PreProcessor/PreReferenceSection';
import ReferenceSection from 'growi-plugin-section-ref/src/client/js/util/PreProcessor/ReferenceSection';

export default (appContainer) => {
  // add interceptors
  // appContainer.interceptorManager.addInterceptors([
    // new FooBarPreRenderInterceptor(),
    // new FooBarPostRenderInterceptor(appContainer),
  // ]);
  appContainer.interceptorManager.addInterceptor(new PreReferenceSection());
  appContainer.interceptorManager.addInterceptor(new ReferenceSection());
  appContainer.originRenderer.preProcessors.unshift(new DefineSection());
};
