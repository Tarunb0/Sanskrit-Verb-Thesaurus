from neo4j import GraphDatabase
import fitz
# URI examples: "neo4j://localhost", "neo4j+s://xxx.databases.neo4j.io"
URI = "bolt://44.200.7.33:7687"
AUTH = ("neo4j", "midwatches-thirteens-backgrounds")


def get_synonyms(query):
    with GraphDatabase.driver(URI, auth=AUTH) as driver:
        driver.verify_connectivity()
        records, summary, keys = driver.execute_query(
        "MATCH (n:Node {lemma: '" + query + "'}) OPTIONAL MATCH (n)-[r:RELATED_TO]->(m:Node) RETURN n, r, m",
        database_="neo4j",
        )

        return [item.data()['r'][-1]['lemma'] for item in records if " " not in item.data()['r'][-1]['lemma']]


def annotate_pdf(pdf, query):
    doc = fitz.open(pdf)
    result = get_synonyms(query)
    result.append(query)
    doc_text = ""
    for page in doc: # iterate the document pages
        text = page.get_text() # get plain text (is in UTF-8)
        doc_text += " " + text # print text on stdout

    highlights = []
    for i in result:
        if i in doc_text:
            highlights.append(i)
    
    for page in doc:
        for text in highlights:
            text_instances = page.search_for(text)
            ### HIGHLIGHT
            for inst in text_instances:
                try:
                    highlight = page.add_highlight_annot(inst)
                    highlight.update()
                except:
                    pass

    doc.save("output.pdf", garbage=4, deflate=True, clean=True)
    
annotate_pdf("/Users/aditya/Downloads/sanskrit.pdf", "कर्म")