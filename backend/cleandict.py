import json

dictjson = open('./words_dictionary.json',"r")
wordDict = json.load(dictjson)
dictjson.close()

def hasThreeConsecutive(word):
  for t in zip(word, word[1:], word[2:]):
    if t.count(t[0]) == 3:
      return True
  return False

def isBadWord(word):
  return len(word) < 4 or hasThreeConsecutive(word)

for key in list(wordDict.keys()):
  if isBadWord(key):
    del wordDict[key]

cleanedjson = json.dumps(wordDict, indent=2)
cleanedjsonfile = open('./cleaned_dictionary.json','w')
cleanedjsonfile.write(cleanedjson)