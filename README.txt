エアコン販買マスター Ver.20.8
RISA EDITION

ホーム画面アイコン修正版

修正内容
・iPhoneが優先する apple-touch-icon.png を新デザインで追加
・以前の apple-touch-icon.png を上書きできる構成
・manifest.json / manifest.webmanifest のアイコンを更新
・アイコンURLに ?v=208 を付けてキャッシュを回避
・faviconも新デザインへ変更
・アプリ本体の機能はVer.20.7を維持

重要な更新手順
1. ZIPを解凍
2. 中の全ファイルをGitHubへ上書き
3. apple-touch-icon.png も必ずアップロード
4. Commit changes
5. 1〜3分待つ
6. Safariで
   https://risaleo.github.io/-aircon-master/?v=208
   を開く
7. ホーム画面にある古いアプリを削除
8. Safariを完全に閉じて再度開く
9. 共有 → ホーム画面に追加

古いアイコンを削除せず再追加すると、以前のアイコンが残る場合があります。
