if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
  // スマホ・タブレット用ページへ転送
  location.href = './sp/login.html';
} else {
  // PC用ページへ転送（必要であれば）
  location.href = './pc/login.html';
}
