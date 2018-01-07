import { canUseWebComponents } from './utils.js'

const fallback = () => {
    if (canUseWebComponents) {
        return
    }

    const templEl = document.querySelector('#tmpl-yuhei-avator')

    document.querySelectorAll('yuhei-avator').forEach((originalEl) => {
        const replacementEl = document.importNode(templEl.content.firstElementChild, true)
        ;[...originalEl.attributes].forEach(({ name, value }) => {
            replacementEl.setAttribute(name, value)
        })
        originalEl.replaceWith(replacementEl)
    })
}

export default fallback
