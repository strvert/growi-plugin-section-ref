import DefineSection from './client/js/util/PreProcessor/DefineSection';
import PreReferenceSection from './client/js/util/PreProcessor/PreReferenceSection';
import ReferenceSection from './client/js/util/PreProcessor/ReferenceSection';

export default (appContainer) => {
  appContainer.interceptorManager.addInterceptor(new PreReferenceSection());
  appContainer.interceptorManager.addInterceptor(new ReferenceSection());
  appContainer.originRenderer.preProcessors.unshift(new DefineSection());
};
