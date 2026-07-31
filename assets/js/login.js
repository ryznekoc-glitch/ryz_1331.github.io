location.href = './home.html'

// ページが読み込まれた時に実行
window.onload = function() {
    // 1. localStorage から保存されている LSK を取得
    const savedLSK = localStorage.getItem('currentUserLSK');

    if (savedLSK) {
        // 2. 保存された LSK が Users の中の誰かのものかチェックする
        // 連想配列の「値（Object）」の部分だけを取り出して配列にし、find で探す
        const isUserValid = Object.values(Users).find(user => user.lsk === savedLSK);

        if (isUserValid) {
            // 3. 該当するユーザーがいれば、ホームへ自動転送
            console.log("ログイン済みユーザーを確認しました:", isUserValid.name);
            location.href = './home.html';
        }
    }
};

function verify() {
    // 1. 入力値を取得
    const UserID = document.getElementById("userId").value;
    const Password = document.getElementById("password").value;
    console.log(`Entered-UserID:${UserID}`)
    console.log(`Entered-Password:${Password}`)
    
    // 2. 照合用のキーを作成（例: "0000@a0000"）
    const UserKey = UserID + "@" + Password;
    console.log(`UserKey:${UserKey}`)
    
    // 3. 連想配列 Users から直接データを取得する
    // 見つかればその中身が、なければ undefined が入ります
    const foundUser = Users[UserKey];
    console.log(`foundUser:${foundUser}`)
    
    // 4. 判定
    if (foundUser) {
        // 見つかった場合（ログイン成功）
        console.log("Login successful:", foundUser.name);
        
        // ユーザー固有の LSK を保存
        localStorage.setItem('currentUserLSK', foundUser.lsk);1
        
        // ホームへ移動
        location.href = './home.html';
    } else {
        // 見つからなかった場合
        alert("ユーザIDまたはパスワードが違います");
    }
}