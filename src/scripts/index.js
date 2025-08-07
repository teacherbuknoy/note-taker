import { saveText } from "./utils.js"

const editor = window.QUILL

editor.keyboard.addBinding({
  key: 's',
  shortKey: true,
}, function (range, context) {
  saveText(editor)
})