# README STEP3

## モデルとストアを使ってみよう！

1つ前のSTEPで、一覧のコンポーネントに対して次のように固定でデータを渡すように実装をしました。

    data: [
        {text: 'TESTTEST', update: '2013/08/01 13:00'},
        {text: 'TESTTEST', update: '2013/08/02 13:00'},
        {text: 'TESTTEST', update: '2013/08/03 13:00'},
        {text: 'TESTTEST', update: '2013/08/01 13:00'},
        {text: 'TESTTEST', update: '2013/08/01 13:00'},
        {text: 'TESTTEST', update: '2013/08/01 13:00'}
    ]

しかし、実際にはこのような実装はあまりせず

- どのようなデータかを表現するモデル（レコード）を実装
- 複数のモデル（レコード）を格納するためのストアを実装

して、まとめてデータの管理を行います。

こうすることでデータの取り回しが良くなるだけでなく、Ext JS/Touchに用意されている様々なコンポーネントには、このストアをバインドする機能が備わっています。

そのため、大量のデータを管理しつつ、表示させたい場合は単にコンポーネントに対して

    store: 'ストア名'

と記述するだけで、ストアに保持されているデータがコンポーネントに描画されます。

簡単ですが、下記スライドのP51に簡易的な図解があります。

- [https://speakerdeck.com/tnker/sencha-irohafalse-i](https://speakerdeck.com/tnker/sencha-irohafalse-i)

## それでは、モデルを作ってみよう！

モデルは、保持するデータがどのようなデータなのかを表現するためのものなので

- どのようなフィールドをもっているのかを定義する`fields`
- データの扱い方の設定をするための`proxy`

を設定します。

今回の例であれば

    {text: 'TESTTEST', update: '2013/08/01 13:00'}

というデータなので、このデータが持っているフィールドは

- text
- update

といった2つのフィールドになります。  
また、データの扱いに関してはAjaxでデータを取得するわけではなく、あくまでサンプルとしてメモリ上に保持しているだけなので、そちらも合わせて設定したのが次のコード

    Ext.define('App.model.Note', {
        extend: 'Ext.data.Model',
        config: {
            fields: [{
                    name: 'text',
                    type: 'string'
                }, {
                    name: 'update',
                    type: 'string'
                }
            ],
            proxy: {
                type: 'memory'
            }
        }
    });

これを、Ajaxを利用してデータを取得するといったことをする場合は、`proxy`プロパティ部分を次のように変更します。

    proxy: {
        type: 'ajax',
        url: 'http://xxxxx.xxxxx'
    }

他にも設定は色々ありますが、詳しくはリファレンスをご参照ください

- [http://docs.sencha.com/extjs/4.2.2/#!/api/Ext.data.Model](http://docs.sencha.com/extjs/4.2.2/#!/api/E
xt.data.Model)


