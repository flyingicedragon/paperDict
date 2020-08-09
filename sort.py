import json


dicFile = open('bioDict.json', encoding='utf8')
dicJson = json.load(dicFile)
dicFile.close()
dicJson = sorted(dicJson.items(), key=lambda d: d[0])
dicJson = dict(dicJson)
dicFile = open('bioDict.json', mode='w', encoding='utf8')
json.dump(dicJson, dicFile, ensure_ascii=False)
dicFile.close()
