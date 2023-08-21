import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

// Firebase initialization (typically done outside the component)
const firebaseConfig = {
  // ... your firebase config
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function SampleComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(db, "sampleCollection"),
        where("status", "==", "active")
      );

      const querySnapshot = await getDocs(q);
      const dataList = [];
      querySnapshot.forEach((doc) => {
        dataList.push(doc.data());
      });
      setData(dataList);
    }

    fetchData();
  }, []); // The empty dependency array ensures this useEffect runs once when the component mounts

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          {/* Render your data here. Assuming the document has a field 'name' */}
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default SampleComponent;


const db = getFirestore(app);  // Ensure you've initialized your Firestore instance
const productCollection = collection(db, 'products', productDoc.id, 'subCollectionName');
