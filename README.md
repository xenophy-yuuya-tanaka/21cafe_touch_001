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