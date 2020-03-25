/*
<script type="text/javascript" src="file:///D:/飞舞的冰龙/Documents/文献/dicScript/dictionary.js"></script>
<script type="text/javascript" src="file:///D:/飞舞的冰龙/Documents/文献/dicScript/paperTranslator.js"></script>
<link rel="stylesheet" href="file:///D:/飞舞的冰龙/Documents/文献/dicScript/style.css">
*/
/**
 * 自动寻找释义并增加释义
 * @param content {ChildNode} 节点
 */
function addMeans(content) {
	let contentStr = content.textContent,
		means = []
	const contentArr = contentStr.split(' ')
	const spaceSize = content.style.wordSpacing
	for (let i = contentArr.length - 1; i >= 0; i--) {
		let mean = [],
			temMean = '',
			spanIndex = 0
		if (contentArr[i].match(/[a-zA-Z-]+/)) {
			if (i > 1 && contentArr[i - 1].match(/[a-zA-Z-]+/)) {
				if (i > 2 && contentArr[i - 2].match(/[a-zA-Z-]+/) && dictionary[contentArr.slice(i - 2, i + 1).join(' ').toLowerCase()]) {
					temMean = dictionary[contentArr.slice(i - 2, i + 1).join(' ').toLowerCase()]
					spanIndex = contentStr.search(contentArr[i-2].match(/[a-zA-Z-]+/)[0])
					mean = [temMean, calLeft(spanIndex, i-2, spaceSize)]
					i -= 2
				} else if (dictionary[contentArr.slice(i - 1, i + 1).join(' ').toLowerCase()]) {
					temMean = dictionary[contentArr.slice(i - 1, i + 1).join(' ').toLowerCase()]
					spanIndex = contentStr.search(contentArr[i-1].match(/[a-zA-Z-]+/)[0])
					mean = [temMean, calLeft(spanIndex, i-1, spaceSize)]
					i -= 1
				}
			}
			if(mean.length==0 && dictionary[contentArr[i].match(/[a-zA-Z-]+/)[0].toLowerCase()]){
				temMean = dictionary[contentArr[i].match(/[a-zA-Z-]+/)[0].toLowerCase()]
				spanIndex = contentStr.search(contentArr[i].match(/[a-zA-Z-]+/)[0])
				mean = [temMean, calLeft(spanIndex, i, spaceSize)]
			}
		}
		if(mean.length>0){
			means.push(mean)
		}
	}
	means.forEach(mean => {createMeanDiv(content, mean)})
}

/**
 * 添加释义节点
 * @param {Element} ele 当前行节点
 * @param {String} mean 释义
 */
function createMeanDiv(ele, mean){
	let meanDiv = document.createElement('div')
	meanDiv.className = 'blue'
	meanDiv.innerHTML = mean[0]
	meanDiv.style.left = mean[1] + 'em'
	ele.appendChild(meanDiv)
}

/**
 * 计算 left 距离
 * @param {Number} spanIndex 位置
 * @param {Number} i 空格数
 * @param {String} spaceSize 空格宽度
 */
function calLeft(spanIndex, i, spaceSize){
	return (spanIndex-i)*0.9+i*parseFloat(spaceSize)
}

window.onload = function () {
	console.log('解释开始')
	let spanEle = document.querySelectorAll('span')
	for (const content of spanEle) {
		addMeans(content)
	}
	console.log('解释结束');
}