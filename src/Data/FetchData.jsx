const neo4j = require("neo4j-driver");

const fetchData = (word) => {
  return new Promise((resolve, reject) => {
    const driver = neo4j.driver(
      // "bolt://3.219.47.205:7687",
      "bolt://44.200.7.33:7687",
      // neo4j.auth.basic("neo4j", "alignments-energies-sum"),
      neo4j.auth.basic("neo4j", "midwatches-thirteens-backgrounds"),
    ); 

    const query = `
      // MATCH (movie:Movie {title:$favorite})<-[:ACTED_IN]-(actor)-[:ACTED_IN]->(rec:Movie)
      // RETURN DISTINCT rec.title AS title LIMIT 20
      MATCH (n:Node {lemma: $wordd}) OPTIONAL MATCH (n)-[r:RELATED_TO]->(m:Node) RETURN n, r, m
    `;

    const params = { wordd : word };

    const session = driver.session({ database: "neo4j" });

    setTimeout(() => {
    session
      .run(query, params)
      .then((result) => {
        // const fetchedData = result.records.map((record) => {
        //   return {title : record.get("n"), id : 1}
        // });
        const fetchedData = result.records.map((record) => (record.get("m").properties))
        console.log(fetchedData);

        const uniqueArray = Array.from(fetchedData.reduce((map, obj) => map.set(obj.id, obj), new Map()).values());

        const uniqueArrayWithoutSpaces = uniqueArray.filter(obj => {
          return typeof obj.lemma === 'string' && !obj.lemma.includes(' ');
        });
        
        // console.log(result.records[0].get("n").properties.lemma);
        // console.log(fetchedData);
        session.close();
        driver.close();
        resolve(uniqueArrayWithoutSpaces); // Resolve with fetched data
      })
      .catch((error) => {
        console.error("Error executing query:", error);
        session.close();
        driver.close();
        reject(error); // Reject with error
      });
    }, 5);
  });
};

export default fetchData;

// const neo4j = require("neo4j-driver");

// const fetchData = (props) => {
//   const driver = neo4j.driver(
//     "bolt://3.219.47.205:7687",
//     neo4j.auth.basic("neo4j", "alignments-energies-sum"),
//     // {
//     //   /* encrypted: 'ENCRYPTION_OFF' */
//     // }
//   );

//   const query = `
//     MATCH (movie:Movie {title:$favorite})<-[:ACTED_IN]-(actor)-[:ACTED_IN]->(rec:Movie)
//     RETURN DISTINCT rec.title AS title LIMIT 20
//   `;

//   const params = { favorite: "The Matrix" };

//   const session = driver.session({ database: "neo4j" });

//   session
//     .run(query, params)
//     .then((result) => {
//       result.records.forEach((record) => {
//         console.log(JSON.stringify(record));
//       });
//     })
//     .catch((error) => {
//       console.error("Error executing query:", error);
//     })
//     .finally(() => {
//       // Close session and driver regardless of success or failure
//       session.close();
//       driver.close();
//     });
// };

// module.exports = fetchData;