import DefineSection from './client/js/util/PreProcessor/DefineSection';
import PreReferenceSection from './client/js/util/Interceptor/PreReferenceSectionInterceptor';
import ReferenceSection from './client/js/util/Interceptor/ReferenceSectionInterceptor';

export default (appContainer) => {
  appContainer.interceptorManager.addInterceptor(new PreReferenceSection());
  appContainer.interceptorManager.addInterceptor(new ReferenceSection());
  appContainer.originRenderer.preProcessors.unshift(new DefineSection());
};
