// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';

// async function findAll() {
    
//     const client = await MongoClient.connect(url, { useNewUrlParser: true })
//         .catch(err => { console.log("s2");console.log(err); });
//     if (!client) return;
        
//     try {
//         console.log('1');
//         const db =  client.db("mydb");
//         console.log('2');
//         let collection =  db.collection('customers');
//         console.log('3');
//         let cursor =  collection.find({}).limit(10);
//         console.log('4');
//         await cursor.forEach(doc => console.log(doc));
//         console.log('5');
//     } catch (err) {
//         console.log(err);
//     } finally {
//         client.close();
//     }
// }
// //setTimeout(()=>{
//     findAll();
//     console.log('iter');
// //}, 5000);


//step 3

// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';

// function findAll() {
//     MongoClient.connect(url, { useNewUrlParser: true })
//         .then(client => {
//             console.log('Connection established successfully');
//             const db = client.db("mydb");
//             let collection = db.collection('customers');
//             let cursor = collection.find({}).limit(10);
//             cursor.forEach(doc => console.log(doc))
//                 .then(() => {
//                     console.log('All documents retrieved');
//                     client.close();
//                 })
//                 .catch(err => console.error('Error retrieving documents:', err));
//         })
//         .catch(err => console.error('Error connecting to MongoDB:', err));
// }

// findAll();
// console.log('iter');

//Step4 - BONUS
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

function connectToMongoDB() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            if (err) {
                reject(err);
            } else {
                resolve(client);
            }
        });
    });
}

function findAllDocuments(client) {
    return new Promise((resolve, reject) => {
        const db = client.db("mydb");
        const collection = db.collection('customers');
        const cursor = collection.find({}).limit(10);
        const documents = [];

        cursor.forEach(doc => documents.push(doc), err => {
            if (err) {
                reject(err);
            } else {
                resolve(documents);
            }
        });
    });
}

connectToMongoDB()
    .then(client => {
        console.log('Connection established successfully');
        return findAllDocuments(client);
    })
    .then(documents => {
        console.log('All documents retrieved:');
        documents.forEach(doc => console.log(doc));
    })
    .catch(err => {
        console.error('Error:', err);
    });
