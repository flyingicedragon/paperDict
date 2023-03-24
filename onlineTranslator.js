// ==UserScript==
// @name         onlineTranlator
// @namespace    http://0.0.0.0/
// @version      0.8.3
// @description  在线阅读文献时，注释生物学相关用词。
// @author       Icedragon
// @match        https://www.ncbi.nlm.nih.gov/pubmed/*
// @match        file:///home/icedragon/Documents/Zotero/*
// @exclude      https://www.ncbi.nlm.nih.gov/pubmed/?term*
// @match        https://www.nature.com/articles/*
// @match        https://www.ncbi.nlm.nih.gov/pmc/articles/*
// @match        https://genomebiology.biomedcentral.com/articles/*
// @match        http://www.plantcell.org/content/*
// @match        https://www.sciencedirect.com/science/article/*
// @match        https://microbiomejournal.biomedcentral.com/articles/*
// @match        https://onlinelibrary.wiley.com/doi/full/*
// @resource     bioDict.json https://github.com/flyingicedragon/paperDict/raw/master/bioDict.min.json
// @grant        GM_getResourceText
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
	function trans(content) {
		/**
		 * 自动寻找释义并增加释义
		 * @param content {ChildNode} 节点
		 */
		let contentStr = content.textContent
		const contentArr = contentStr.split(' ')
		const dictStr = GM_getValue('paperdict_dict', null)
		if (dictStr == null) {
			console.log('无法加载词库')
		}
		const dictionary = JSON.parse(dictStr)
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
		/**
		 * 开始翻译
		 */
		console.log('翻译开始')
		let pEles = document.querySelectorAll('p, h1, h2, h3, h4')
		for (const pEle of pEles) {
			for (const content of pEle.childNodes) {
				trans(content)
			}
		}
		console.log('翻译结束');
	}

	let update_dict = function () {
		/**
		 * 更新词库
		 */
		console.log('更新词库')
		const dictStr = GM_getResourceText('bioDict.json')
		GM_setValue('paperdict_dict', dictStr)
	}

	let buttonEle = document.createElement('input')
	buttonEle.type = 'button'
	buttonEle.value = '翻译'
	buttonEle.onclick = start
	buttonEle.style.position = 'fixed'
	buttonEle.style.top = '300px'
	buttonEle.style.right = '100px'
	buttonEle.style.height = '30px'
	buttonEle.style.width = '60px'
	document.body.appendChild(buttonEle)

	let buttonEle=document.createElement('input')
	buttonEle.type = 'button'
	buttonEle.value = '更新'
	buttonEle.onclick = update_dict
	buttonEle.style.position = 'fixed'
	buttonEle.style.top = '350px'
	buttonEle.style.right = '100px'
	buttonEle.style.height = '30px'
	buttonEle.style.width = '60px'
	document.body.appendChild(buttonEle)
}())