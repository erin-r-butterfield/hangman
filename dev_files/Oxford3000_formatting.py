l1 = []

with open("The_Oxford_3000.txt" ,"r") as f:
    line = f.readlines()
    # print(line)


for entry in line:
    word = entry.split(" ")[0]
    if word[0].isalpha():
        if len(word) >= 3:
            if word[-1].isdigit():
                l1.append('"' + word[:-1].replace('\n','') + '",')
            else:
                l1.append('"' + word.replace('\n','')  + '",')

        
            
l2 = list(dict.fromkeys(l1))

l2_1 = l2[0]
l2_last = l2[-1]
l2[0] = "var mywords = [" + l2_1
l2[-1] = l2_last.strip(",") + "];"

with open("Oxford3000.js", "w") as f2:
    for item in l2:
        f2.write(item)



print('no. words: ' + str(len(l2)))

