import csv
import json

with open('../data.json', 'r') as f:
    data = json.loads(f.read())

new_data = []
import queue

# Create a dictionary for easy lookup of nodes by id
data_dict = {item['id']: item for item in data}

# Use a queue to implement BFS
q = queue.Queue()

# Enqueue initial nodes
for item in data:
    q.put(item)

# Use a set to keep track of visited nodes
visited = set()

while not q.empty() and len(new_data) < 2000:
    node = q.get()
    new_data.append(node)
    visited.add(node['id'])

    # Enqueue nodes mentioned in synsets that haven't been visited yet
    for synset in node['synsets']:
        if synset not in visited and synset in data_dict:
            q.put(data_dict[synset])

data = new_data

csv_file = 'nodes.csv'
csv_columns = ['id', 'lemma', 'pos']

# Write the JSON data to the CSV file
with open(csv_file, 'w', newline='') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
    writer.writeheader()
    for item in data:
        writer.writerow({key: item[key] for key in csv_columns})

relationships = []
for node in data:
    start_id = node['id']
    for end_id in node['synsets']:
        if {'start_id': end_id, 'end_id': start_id} not in relationships and {'start_id': start_id, 'end_id': end_id} not in relationships and start_id != end_id:
            relationships.append({'start_id': start_id, 'end_id': end_id})

csv_relationships = 'relationships.csv'
csv_relationships_columns = ['start_id', 'end_id']

with open(csv_relationships, 'w', newline='') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=csv_relationships_columns)
    writer.writeheader()
    for relationship in relationships:
        writer.writerow(relationship)


