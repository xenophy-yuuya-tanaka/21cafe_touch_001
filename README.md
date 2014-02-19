# README STEP1

## まず、プロジェクトを作成してみましょう！

ターミナルもしくは、コマンドプロンプトにて下記コマンドを実行します。

    sencha -sdk [SDKプロジェクトPath] generate app [APP名] [APP生成パス]
    
- SDKプロジェクトPath
    - Sencha TouchのSDKフォルダまでのファイルパス
- APP名
    - 生成するアプリケーションの名前
- APP生成パス
    - アプリケーションのファイルを出力するフォルダ


生成が完了すると下記のようなファイルが生成されるはずです

    - app/
    - build/
    - packages/
    - resources/
    - touch/
    - app.js
    - app.json
    - bootstrap.js
    - bootstrap.json
    - build.xml
    - index.html
    - packager.json


## 確認してみよう！

ローカルWebサーバーを起動して確認してみよう！

## Sencha CmdでローカルWebサーバーの起動

Apache等が入ってない人は `Sencha Cmd` を利用しましょう！

    sencha web -port [ポート番号] start -map [ドキュメントルートパス]

- ポート番号
    - Webサーバーのポートを指定  
      （例：3000を指定した場合は、http://localhost:3000）
- ドキュメントルートパス
    - Webサーバーへアクセスした際に表示させるディレクトリ  
      （例：現在のディレクトリを指定する場合は「./」など）

## 自分でコンポーネントを設置してみよう！

    - app/
      ├ controller/
      ├ form/
      ├ model/
      ├ store/
      ├ profile/
      └ view/
        └ Main.js ←このファイルを編集します

## 簡易コード説明

以下のサンプルでは、`Ext.Panel`を継承した`App.view.Panel`を作成しています。  
自作クラスの命名規則については、`appディレクトリ`をアプリケーションの名前空間に置き換え、その後各ディレクトリ名とファイル名で構成したものになります。

    Ext.define('App.view.Main', {
     
        extend: 'Ext.Panel',
        xtype: 'main',
     
        config: {
            layout: 'hbox',
            items: [{
                xtype: 'button',
                text: 'Sample'
            }]
        }
    });



### クラス定義

クラス定義には、`Ext.define`メソッドを利用します。

- 第1引数
    - クラス名
- 第2引数
    - クラスに付与するプロパティを内包したオブジェクトデータ

### xtype

`xtype`は、`Ext.widget`メソッドで利用したり、コンポーネントの`items`プロパティ内で、コンポーネントを指定する際にも使われます。

### items

自身のコンポーネント内に、他のコンポーネントを入れたいといった場合に、この`items`内にどんどん追加していくような流れになります。

また、`items`の中に置いたコンポーネントの中に更に`items`を書いてコンポーネントを配置することも可能です。

        config: {
            layout: 'hbox',
            items: [{
                xtype: 'button',
                text: 'Sample'
            }, {
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    align: 'center'
                },
                items: [{
                    xtype: 'panel'
                }, {
                    xtype: 'panel'
                }]
            }]
        }

### layout

`items`プロパティ内に配置したコンポーネントのレイアウト方法を設定することが出来ます。  
単純にレイアウトタイプを選択するのであれば、`layout`プロパティの中に文字列を設定し、更に細かく`align`等のプロパティを設定したい場合は、オブジェクトリテラルで設定を行います。  
（上記コード参照）


詳しくは、公式リファレンスをご確認ください

- [http://docs.sencha.com/touch/2.3.1/#!/guide/layouts](http://docs.sencha.com/touch/2.3.1/#!/guide/layouts)

