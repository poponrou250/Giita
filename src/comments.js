import firebase from "firebase"

const state = {
  imageURL: null,
  uploadFile: null,
  infoMsg: null,
}

const getters = {
  imageURL: (state) => state.imageURL,
  uploadFile: (state) => state.uploadFile,
}

const mutations = {
  //アップロードする画像を選択
  uploadFile(state, uploadFile) {
    state.uploadFile = uploadFile
  },

  //画像アップロード機能
  upload(state) {
    if (!state.uploadFile) {
      state.infoMsg = "選択してください"
      return
    }
    //Firebase Store上での画像URL
    state.imageURL = "tmp/" + state.uploadFile.name
    //アップロード
    var storageRef = firebase.storage().ref().child(state.imageURL)
    storageRef.put(state.uploadFile).then(function (snapshot) {
      console.log("Uploaded a blob or file!")
      console.log(snapshot)
    })
  },

  //画像アップロードファイルとStorage先保存URLを初期化
  initialize(state) {
    state.imageURL = null
    state.uploadFile = null
  },
}

const actions = {
  //mutation : uploadへ
  selectFile: function ({ commit }, e) {
    e.preventDefault()
    let files = e.target.files
    commit("uploadFile", files[0])
  },
  upload: function ({ commit }) {
    commit("upload")
  },
  initialize: function ({ commit }) {
    commit("initialize")
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
