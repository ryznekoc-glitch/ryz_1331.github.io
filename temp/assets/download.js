/**
 * 出席番号に応じたファイルを Zip にまとめてダウンロードする処理
 * @param {string} attendNumber - 出席番号 ('01', '02', ...)
 */
async function startDownload(attendNumber) {
    // 1. ボタンを処理中表示に変更（連打防止）
    const btn = document.getElementById('downloadBtn');
    let originalText = '';
    if (btn) {
        originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = "ダウンロード中...";
    }

    // 2. selector (imageSelector.js) から対象ファイル名リストを取得
    const files = selector[attendNumber];

    if (!files || files.length === 0) {
        alert("ダウンロード対象のファイルが見つかりません。");
        resetButton(btn, originalText);
        allow = 0;
        return;
    }

    try {
        const zip = new JSZip();

        // ⚠️【重要】全ファイル（画像・動画・thereIsNothingHere.html）が保存されているフォルダパス
        const baseDir = "../img/";

        // 3. 配列にあるファイルをすべて Zip に追加（.html も含めてそのまま取得します）
        const fetchPromises = files.map(async (fileName) => {
            const fileUrl = `${baseDir}${fileName}`;
            const response = await fetch(fileUrl);

            if (!response.ok) {
                throw new Error(`ファイルの取得に失敗しました: ${fileName}`);
            }

            // ファイルデータを取得して Zip 内に格納
            const blob = await response.blob();
            zip.file(fileName, blob);
        });

        // すべてのファイル取得完了を待つ
        await Promise.all(fetchPromises);

        // 4. Zipデータ（Blob）を生成
        const zipBlob = await zip.generateAsync({ type: "blob" });

        // 5. ブラウザにZipファイルをダウンロードさせる
        const downloadUrl = URL.createObjectURL(zipBlob);
        const anchor = document.createElement('a');
        anchor.href = downloadUrl;
        anchor.download = `pictures_${attendNumber}.zip`;
        document.body.appendChild(anchor);
        anchor.click();

        // 6. メモリ解放・後片付け
        document.body.removeChild(anchor);
        URL.revokeObjectURL(downloadUrl);

    } catch (error) {
        console.error("ダウンロードエラー:", error);
        alert("ファイルの取得に失敗しました。\nパスの設定や通信状態を確認してください。");
    } finally {
        // ボタンの状態を元に戻す
        resetButton(btn, originalText);
        allow = 0;
    }
}

// ボタンを元の状態に戻す補助関数
function resetButton(btn, text) {
    if (btn) {
        btn.disabled = false;
        btn.textContent = text || "ダウンロードを開始";
    }
}
