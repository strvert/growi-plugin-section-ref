export default class DefineSection {
  process(markdown) {
    const regexp = /(^@startsection:(.*)$(.|[\r\n])*?@endsection$)/gm;

    return markdown.replace(regexp, (match) => {
      return match.replace(/^@(start|end)section.*$/gm, '');
    });
  }
}
