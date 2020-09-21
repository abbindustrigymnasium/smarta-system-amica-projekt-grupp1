arr = open("input.txt").read().splitlines()

for i in arr:
    if i in arr[arr.index(i) + 1:]:
        arr.remove(i)

with open("output.txt", "w") as file:
        for item in arr:
                file.write("%s\n" % item)

print(arr)