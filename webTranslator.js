/*
<script type="text/javascript" src="dicScript/dictionary.js"></script>
<script type="text/javascript" src="dicScript/webTranslator.js"></script>
*/
function trans(content) {
    /**
     * 自动寻找释义并增加释义
     * @param content {ChildNode} 节点
     */
    let contentStr = content.textContent
    const contentArr = contentStr.split(' ')
    for (let i = contentArr.length - 1; i >= 0; i--) {
        let hasTrans = 0
        if (contentArr[i].match(/[a-zA-Z-]+/)) {
            if (i > 1 && contentArr[i - 1].match(/[a-zA-Z-]+/)) {
                if (i > 2 && contentArr[i - 2].match(/[a-zA-Z-]+/) && dictionary[contentArr.slice(i - 2, i + 1).join(' ').toLowerCase()]) {
                    contentArr[i] += ' (' + dictionary[contentArr.slice(i - 2, i + 1).join(' ').toLowerCase()] + ')'
                    i -= 2
                    hasTrans = 1
                } else if (dictionary[contentArr.slice(i - 1, i + 1).join(' ').toLowerCase()]) {
                    contentArr[i] += ' (' + dictionary[contentArr.slice(i - 1, i + 1).join(' ').toLowerCase()] + ')'
                    i -= 1
                    hasTrans = 1
                }
            }
            if(!hasTrans && dictionary[contentArr[i].match(/[a-zA-Z-]+/)[0].toLowerCase()]){
                contentArr[i] += ' (' + dictionary[contentArr[i].match(/[a-zA-Z-]+/)[0].toLowerCase()] + ')'
            }
        }
    }
    contentStr = contentArr.join(' ')
    content.textContent = contentStr
}

window.onload = function () {
    console.log('翻译开始')
    let pEles = document.querySelectorAll('p, h1, h2, h3, h4')
    for (const pEle of pEles) {
        for (const content of pEle.childNodes) {
            trans(content)
        }
    }
    console.log('翻译结束');
}