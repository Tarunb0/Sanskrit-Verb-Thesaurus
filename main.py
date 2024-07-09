import json
import csv
import time
import sqlite3


def import_data_to_sqlite():
    conn = sqlite3.connect('btp.db')
    cursor = conn.cursor()

    cursor.execute('''CREATE TABLE IF NOT EXISTS Nodes (
                        id TEXT PRIMARY KEY,
                        lemma TEXT,
                        pos TEXT
                    )''')

    with open('nodes.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        to_db = [(row['id'], row['lemma'], row['pos']) for row in reader]

    cursor.executemany('INSERT INTO Nodes (id, lemma, pos) VALUES (?, ?, ?)', to_db)
    conn.commit()

    cursor.execute('''CREATE TABLE IF NOT EXISTS Relationships (
                        start_id TEXT,
                        end_id TEXT,
                        FOREIGN KEY (start_id) REFERENCES Nodes(id),
                        FOREIGN KEY (end_id) REFERENCES Nodes(id)
                    )''')

    # Import data from relationships.csv
    with open('relationships.csv', 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        to_db = [(row['start_id'], row['end_id']) for row in reader]

    cursor.executemany('INSERT INTO Relationships (start_id, end_id) VALUES (?, ?)', to_db)
    conn.commit()

    conn.close()

start = time.time()
import_data_to_sqlite()
print(f"Time to import data: {time.time() - start}")


import sqlite3
print(sqlite3.version)
import time

def check_database_metrics():
    conn = sqlite3.connect('btp.db')
    cursor = conn.cursor()

    # Get total number of nodes
    start_time = time.time()
    cursor.execute('SELECT COUNT(*) FROM Nodes')
    total_nodes = cursor.fetchone()[0]
    end_time = time.time()
    print(f"Total number of nodes: {total_nodes}")
    print(f"Time taken to get node count: {end_time - start_time} seconds")

    # Get total number of relationships
    start_time = time.time()
    cursor.execute('SELECT COUNT(*) FROM Relationships')
    total_relationships = cursor.fetchone()[0]
    end_time = time.time()
    print(f"Total number of relationships: {total_relationships}")
    print(f"Time taken to get relationship count: {end_time - start_time} seconds")

    # Other metrics or queries can be added as needed

    conn.close()

start_time = time.time()
check_database_metrics()
end_time = time.time()
print(f"Total time taken to check database metrics: {end_time - start_time} seconds")


import sqlite3

def find_connected_nodes(start_node_id, d):
    conn = sqlite3.connect('btp.db')
    cursor = conn.cursor()

    query = f"""
    WITH RECURSIVE NodeHierarchy(id, end_id, depth) AS (
        -- Starting with relationships where start_id matches the given '{start_node_id}'
        SELECT R.start_id, R.end_id, 1 AS depth
        FROM Relationships R
        WHERE R.start_id = '{start_node_id}'
        
        UNION ALL
        
        -- Recursively fetching relationships in both directions
        SELECT R.start_id, R.end_id, NH.depth + 1
        FROM Relationships R
        JOIN NodeHierarchy NH ON (R.start_id = NH.end_id OR R.end_id = NH.id) -- Bidirectional relationship check
        WHERE NH.depth < {d} -- Change 10 to the desired depth
    )
    SELECT DISTINCT end_id  
    FROM NodeHierarchy
    WHERE id <> '{start_node_id}' -- Excluding the starting node
    ORDER BY end_id;

    """

    cursor.execute(query)
    results = cursor.fetchall()
    
    conn.close()
    return results


for i in range(1, 11)
    start_node_id = 'oewn-torrent-n'
    start_time = time.time()
    connected_nodes = find_connected_nodes(start_node_id, i)
    end_time = time.time()

    if connected_nodes:
        print(f"Connected nodes to '{start_node_id}' up to depth {i}:")
        for node in connected_nodes:
            print(node[0])
    else:
        print("No connected nodes found.")
    print(f"Total time taken to get 10 dfs {end_time - start_time} seconds")

