
keyword = '13204'
message = list("ELVIS")
res = []
message = list(message)

word = [int(l) for l in keyword]
print(message)
for i,key in enumerate(word):
  print('i', i)
  print('key', key)
  res[i].append(message[key])

res2 = ' '.join([str(elem) for elem in res])

print(res2)
8
