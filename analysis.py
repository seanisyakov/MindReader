import matplotlib.pyplot as plt
plt.rcdefaults()
import numpy as np
import matplotlib.pyplot as plt
import json

with open('data.json', 'r') as d:
    questions = json.load(d)

def id_names(questions):
    names = []
    for i in questions:
        logicName = i["logical_id"]
        names.append(logicName)
    tupleOfNames = tuple(set(names))
    names = []
    return tupleOfNames

def ratingAvg(names, questions):
    nameAndRating = []
    for name in names:
        list_of_ratings = [res['rating'] for res in questions if res['logical_id'] == name]
        nameAndRating.append((name, (sum(list_of_ratings) / float(len(list_of_ratings))) ))
    return nameAndRating

def takeSecondIndex(L):
    emptyList = []
    for i in L:
        emptyList.append(i[1])
    return emptyList

def takeFirstIndex(L):
    emptyList = []
    for i in L:
        emptyList.append(i[0])
    return emptyList


def sortList(L):
    return sorted(L, key = lambda t: t[1])


# Example data
namesAndData = id_names(questions)
people = list(reversed(takeFirstIndex(sortList(ratingAvg(list(namesAndData), questions )))))
y_pos = np.arange(len(people))
performance =  list(reversed(takeSecondIndex(sortList(ratingAvg(list(namesAndData), questions )))))
error = 5 * np.random.rand(len(people))

plt.barh(y_pos, performance, xerr=error, align='center', alpha=0.4)
plt.yticks(y_pos, people)
plt.xlabel('Perceived Likelihood')
plt.title('Disposition to Beilieve')

plt.show()

print (id_names())
print (performance)
print sortList(ratingAvg(list(namesAndData), questions ))

