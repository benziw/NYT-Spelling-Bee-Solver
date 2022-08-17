import json
import re
from tracemalloc import start

allWordsJSON = open('./words_dictionary.json', 'r')
allWordsDict = json.load(allWordsJSON)
allWordsJSON.close()


def hasThreeConsecutive(word):
  for t in zip(word, word[1:], word[2:]):
    if t.count(t[0]) == 3:
      return True
  return False


def isBadWord(word):
  return len(word) < 4 or hasThreeConsecutive(word)


def strToSort(str):
  return "".join(sorted([*str]))


def strToUniqueSort(str):
  return "".join(sorted(list(set([*str]))))

wordsList = []
for word in allWordsDict.keys():

    #create list of all words from dictionary that count for spelling bee
    if not isBadWord(word):
        wordsList += [word]

#populate keys in output dict
outputDict = {k : [] for k in list(set(map(strToUniqueSort, wordsList))) if len(k) == 7}

#populate values in output dict
allKeys = "#".join(outputDict.keys())
allKeys = '#' + allKeys + '#'
for word in wordsList:

  startIndices = [w.start() for w in re.finditer(strToUniqueSort(word),allKeys)]
  for ind in startIndices:
    startIndex = allKeys[0:ind].rindex('#') + 1
    #print(f"adding val {word} to key {allKeys[startIndex:startIndex+7]}")
    outputDict[allKeys[startIndex:startIndex+7]] += [word]

    
outWordsJSON = open('./lettersWords.json','w')
outWordsJSON.write(json.dumps(outputDict, indent=2))
outWordsJSON.close()