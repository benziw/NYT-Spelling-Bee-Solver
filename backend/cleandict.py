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
cleanedjsonfile.close()
cleanedjsonfile = open('./cleaned_dictionary.json','r')
cleanedDict = json.load(cleanedjsonfile)

letterswordsdict = {}

def strToUniqueSort(str):
  return "".join(sorted(list(set([*str]))))

for word in list(cleanedDict.keys()):

  wordKey = strToUniqueSort(word)

  if len(wordKey) > 7:
    pass
  elif wordKey in letterswordsdict.keys():
    letterswordsdict[wordKey] += [word]
  else:
    letterswordsdict[wordKey] = [word]

# def getContainedIn(item, lst):

#   for x in lst:
#     if item in x:
#       return x

#   return False

# keysLenSeven = list(filter(lambda str : len(str) == 7,letterswordsdict.keys()))

# for charKey in list(filter(lambda str : len(str) < 7, letterswordsdict.keys())):

#   containKey = getContainedIn(charKey,keysLenSeven)

#   if containKey:
#     letterswordsdict[containKey] += letterswordsdict[charKey]
#     del letterswordsdict[charKey]

letterswordsdict_exactly7 = {k : v for k,v in letterswordsdict.items() if len(k) == 7}


letterswordsdump = json.dumps(letterswordsdict_exactly7, indent=2)
letterswordsjson = open('./letters_words.json','w')
letterswordsjson.write(letterswordsdump)
letterswordsjson.close()
