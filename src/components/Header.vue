<template>
  <header>
      <h1>Giita</h1>
      <div class="header-list">
        <ul>
          <li>投稿</li>
          <li>ログイン</li>
          <li>新規登録</li>
        </ul>
      </div>
    </header>
</template>

<style>

/* HeaderのCSS */

/* ページ全体の余白を消す */
* {
  padding: 0;
  margin: 0;
}

/* Header部分 */
header {
  background-color: greenyellow;
  height: 80px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header a {
  text-decoration: none; 
}


header h1 {
  margin-left: 20px;
}


.header-list {
  display: flex;
  align-items: center;
}

/* flexでli要素を横に並べる */
header ul {
  display: flex;
}

header li {
  list-style: none; 
  margin-right: 40px;
}

</style>