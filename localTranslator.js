// ==UserScript==
// @name         onlineTranlator
// @namespace    http://0.0.0.0/
// @version      0.6.3
// @description  在线阅读文献时，注释生物学相关用词。
// @author       Icedragon
// @match        https://www.ncbi.nlm.nih.gov/pubmed/*
// @match        file:///media/icedragon/Data/*/Documents/Zotero/*
// @exclude      https://www.ncbi.nlm.nih.gov/pubmed/?term*
// @match        https://www.nature.com/articles/*
// @match        https://www.ncbi.nlm.nih.gov/pmc/articles/*
// @match        https://genomebiology.biomedcentral.com/articles/*
// @match        http://www.plantcell.org/content/*
// @match        https://www.sciencedirect.com/science/article/*
// @match        https://microbiomejournal.biomedcentral.com/articles/*
// @match        https://https://onlinelibrary.wiley.com/doi/full/*
// @require      file:///home/icedragon/DocumentsNotSync/git/paperDict/dictionary.js
// @grant        none
// ==/UserScript==

(function(){
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
				if (!hasTrans && dictionary[contentArr[i].match(/[a-zA-Z-]+/)[0].toLowerCase()]) {
					contentArr[i] += ' (' + dictionary[contentArr[i].match(/[a-zA-Z-]+/)[0].toLowerCase()] + ')'
				}
			}
		}
		contentStr = contentArr.join(' ')
		content.textContent = contentStr
    }

	let start = function () {
		console.log('翻译开始')
		let pEles = document.querySelectorAll('p, h1, h2, h3, h4')
		for (const pEle of pEles) {
			for (const content of pEle.childNodes) {
				trans(content)
			}
		}
		console.log('翻译结束');
	}
	start()
	let buttonEle = document.createElement('input')
	buttonEle.type = 'button'
	buttonEle.value = '翻译'
	buttonEle.onclick = start
	buttonEle.style.position = 'fixed'
	buttonEle.style.top = '300px'
	buttonEle.style.right = '100px'
	document.body.appendChild(buttonEle)
}())