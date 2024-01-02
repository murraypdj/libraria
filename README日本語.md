# リブラリア - あなたのDjango図書館管理システム

リブラリアは、ユーザーが効率的に本のコレクションを管理し整理できるDjangoベースの図書館管理システム（LMS）です。本の愛好家であるか、小さな図書館を管理している場合でも、リブラリアは本の追加、編集、および削除に対するユーザーフレンドリーなインターフェースを提供します。

## 特徴

- ISBN、タイトル、数量、カバー、および保存場所などの詳細を含めて本を追加します。
- Open Library APIを使用してISBNで本を追加します。
- 本の情報を編集および更新します。
- コレクションから本を削除します。
- 図書館内のすべての本のリストを表示します。
- シームレスなユーザーエクスペリエンスのためのレスポンシブデザイン。

## インストール

1. リポジトリをクローンします：

   ```bash
   git clone https://github.com/murraypdj/libraria.git
   cd libraria

2. 仮想環境を作成します：
   python -m venv venv

3.仮想環境をアクティベートします：
  macOSおよびLinux：
  source venv/bin/activate
  Windows：
  .\venv\Scripts\activate

4. 依存関係をインストールします：
   pip install -r requirements.txt

5. マイグレーションを適用します：
   python manage.py migrate

6. 開発サーバーを実行します：
   python manage.py runserver

Webブラウザで http://localhost:8000/ にアクセスして、リブラリアアプリケーションにアクセスします。
