function logout() {
    document.getElementById("warnMessages").innerText = "ログアウトは現在使用できません。\n(ここをクリックしてメッセージを消去)"

    // 保存されている情報を消す
    //localStorage.removeItem('currentUserLSK');
    
    // ログイン画面に戻る
    //location.href = './login.html';
}
function reset() {
    document.getElementById("warnMessages").innerText = ""
}