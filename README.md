# growi-plugin-section-ref

sectionを定義し、Wiki全体から文章を参照できるようにするプラグイン

### セクションの定義
```
@startsection:[id]
ここに書いた文章が参照される
@endsection
```

### セクションの参照
```
$secref(plink=[対象ページのID],secid=[定義したセクションのid])
```
