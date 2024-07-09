# Web-Based Sanskrit Verb Thesaurus

## Project Overview

This repository contains the source code and documentation for the "Web-Based Sanskrit Verb Thesaurus" project. This project aims to create a digital resource for Sanskrit verbs, enhancing the accessibility and understanding of the Sanskrit language by leveraging the Sanskrit Verb Thesaurus, "Kriyanighantu," compiled by Manoj VR. The thesaurus documents over 1,993 root words and their meanings, providing a valuable resource for Sanskrit linguistics.

## Table of Contents

- [Abstract](#abstract)
- [Introduction](#introduction)
  - [Project Background](#project-background)
  - [Problem Statement](#problem-statement)
- [Existing Approaches](#existing-approaches)
  - [Overview of WordNet](#overview-of-wordnet)
  - [WordNet for English](#wordnet-for-english)
  - [WordNet for Sanskrit](#wordnet-for-sanskrit)
- [Proposed Approach](#proposed-approach)
- [Database Evaluation](#database-evaluation)
  - [Literature Survey](#literature-survey)
  - [Choosing a Database](#choosing-a-database)
  - [Methodology](#methodology)
  - [Results](#results)
  - [Conclusion](#conclusion)
- [VerbNet](#verbnet)
  - [Schema](#schema)
  - [Database](#database)
  - [System Diagram](#system-diagram)
  - [Website and UI](#website-and-ui)
  - [Functionalities](#functionalities)
- [Conclusion and Future Work](#conclusion-and-future-work)
- [Bibliography](#bibliography)

## Abstract

Sanskrit, an Indo-Aryan language with deep roots in the Indian subcontinent, is culturally significant and intricate. This project uses the Sanskrit Verb Thesaurus "Kriyanighantu" to build a web-based Sanskrit VerbNet. By developing a comprehensive online resource, we aim to enhance the accessibility and understanding of Sanskrit, bridging the gap between tradition and technology. This project contributes to Sanskrit linguistics and language comprehension in modern digital contexts.

## Introduction

### Project Background

The Sanskrit Verb Thesaurus "Kriyanighantu," compiled by Manoj VR, documents over 1,993 root words and their meanings. It is an invaluable resource for Sanskrit enthusiasts and grammarians. The project aims to create a web-based platform for querying these verbs, enhancing accessibility and convenience.

### Problem Statement

Existing Sanskrit WordNets focus more on nouns, adverbs, and adjectives, giving less importance to the rich verbology of Sanskrit. This project aims to build an online Sanskrit verb thesaurus, making Sanskrit more accessible and comprehensible.

## Existing Approaches

### Overview of WordNet

WordNet is a lexical database that organizes words by their meanings and semantic relationships, connecting them via synonyms, hyponyms, and meronyms. It is widely used in text analysis and AI applications.

### WordNet for English

The first WordNet for English was developed by Princeton University. The Open English WordNet (OEWN) is an open-source alternative containing modern words and phrases.

### WordNet for Sanskrit

Several attempts have been made to create a Sanskrit WordNet, but existing versions have limitations, including a lack of comprehensive verb coverage and outdated technology.

## Proposed Approach

The project follows a five-step process:

1. **Digitalization**: Converting the Sanskrit verb thesaurus into a digital format.
2. **Database Schema**: Creating a database schema based on the collected data.
3. **Data Conversion**: Populating the database with content from the thesaurus.
4. **User-Friendly Interface**: Developing an intuitive frontend for verb retrieval.
5. **Document Search**: Implementing a feature to annotate relevant verbs in uploaded Sanskrit documents.

## Database Evaluation

### Literature Survey

Various studies compare the performance of SQL and NoSQL databases, providing insights into their strengths and weaknesses in handling key-value stores.

### Choosing a Database

Due to licensing issues with the thesaurus data, we used the English WordNet data to test different databases, comparing metrics such as the number of nodes, relationships, query time, throughput, and latency.

### Methodology

Experiments were conducted using a virtual machine with 128 GB storage and 8 GB RAM, focusing on SQL (SQLite3), graph databases (Neo4J), and distributed file systems (HDFS using PIG).

### Results

Graph databases like Neo4J demonstrated efficient performance in querying nodes within a graph structure, proving suitable for the VerbNet.

## VerbNet

### Schema

The schema defines the structure for verbs and their meanings, using attributes like `unique_id`, `lemma`, `adverb`, `english_meaning`, `look_up`, and `see_also`.

### Database

A Neo4J graph database is used to load, store, host, and share Sanskrit verbs, with nodes representing verbs and relationships representing synonyms.

### System Diagram

The system architecture includes a frontend server (React), a Node.js backend, and a Neo4J database server.

### Website and UI

The user interface is built using HTML, CSS, and JavaScript, providing functionalities like Lemma Search and PDF Search to retrieve and highlight synonyms in Sanskrit texts.

## Conclusion and Future Work

The Sanskrit VerbNet represents a significant advancement in linguistic resources, providing a comprehensive database of Sanskrit verbs and innovative functionalities to support linguistic analysis and research. Future work will focus on optimizing the web interface and expanding the database.

## Bibliography

- Kulkarni, M., Dangarikar, C., Kulkarni, I., Nanda, A., & Bhattacharyya, P. (Year). Introducing Sanskrit WordNet.
- Li, Y., & Manoharan, S. (2013). A performance comparison of SQL and NoSQL databases.
- Manoj, V. R. (2021). Thesaurus of Synonymous Sanskrit Verbs.
- McCrae, J. P., Rademaker, A., Bond, F., Rudnicka, E., & Fellbaum, C. (2019). English WordNet 2019 – An open-source WordNet for English.
- Miller, G. A. (1995). WordNet: A lexical database for English.
- Narayan, D., Chakrabarti, D., Pande, P., & Bhattacharyya, P. (2002). An experience in building the Indo WordNet.
- Panjwani, R., Kanojia, D., & Bhattacharyya, P. (2018). PyIWN: A Python-based API to access Indian language WordNets.
- Tudorica, B. G., & Bucur, C. (2011). A comparison between several NoSQL databases with comments and notes.
