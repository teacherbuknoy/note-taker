const DATABASE_NAME = 'fr-note-taker'

async function saveContent(content, db) {
  console.log(content)
  const transaction = db.transaction('notes', 'readwrite')
  const objectStore = transaction.objectStore('notes')
  const request = objectStore.add(content)

  request.onsuccess = event => {
    console.info('Content saved.')
    console.log(content)
  }

  request.onerror = event => {
    console.error(event)
  }
}

function upgradeDatabase(event) {
  const db = event.target.result
  const objectStore = db.createObjectStore('notes', { keyPath: 'id' })

  objectStore.transaction.oncomplete = event => {
    const notesObjectStore = db.transaction('notes', 'readwrite')
      .objectStore('notes')

    notesObjectStore
  }
}

export async function saveText(editor) {
  const request = window.indexedDB.open(DATABASE_NAME, 3)

  request.onerror = err => console.error("Indexed DB not allowed", err)

  request.onupgradeneeded = upgradeDatabase

  request.onsuccess = event => {
    console.log(event)
    const db = event.target.result
    console.info('IndexedDB access granted')
    const content = editor.getContents()
    content.id = crypto.randomUUID()
    content.dateUpdated = new Date()
    saveContent(content, db)
  }

}