import React, { useEffect, useState } from 'react';
import './PlansScreen.css';
import db from '../firebase';
import { collection, getDocs, query, where , addDoc, onSnapshot } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlansScreen() {

    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    useEffect(() => {
        async function fetchData() {
            const q = query(
                collection(db, "products"),
                where("active", "==", true)
            );

            const querySnapshot = await getDocs(q);
            const products = {};
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
               // const priceSnap = await productDoc.ref.collection('prices').get();
                const pricesCollection = collection(productDoc.ref, 'prices');
                const priceSnap = await getDocs(pricesCollection);
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            });
            setProducts(products);

        }
        fetchData();
    },[]);

    console.log(products);
    async function loadCheckout (priceId) {
        const checkoutSessionsRef = collection(db, "customers", user.uid, "checkout_sessions");
        const docRef = await addDoc(checkoutSessionsRef, {
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin
        });
        const unsubscribe = onSnapshot(docRef, (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                alert(`An error Ocurred : ${error.message}`);
            }
            if (sessionId) {
                handleStripeSession(sessionId);
            }
        });  
    }

    async function handleStripeSession(sessionId) {
        // Assuming you've set up your Stripe publishable key
        const stripe = await loadStripe('pk_test_51Nee6cDch7H93XXPe97Kwn4t9o39XAlmOGCv8Yrii43k4HPKGC6an9EaSf0jW895lwHfxHD6b06K4kU3xcZ1iI8V00QRboW82K');
                
        if (stripe) {
            const { error } = await stripe.redirectToCheckout({ sessionId });
            
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer.
            if (error) {
                alert(error.message);
            }
        }
    }

  return (
      <div className='plansScreen'>
          {Object.entries(products).map(([productId, productData]) => {
              return (
                  <div className='plansScreen__plan'>
                      <div className='plansScreen__info'>
                      <h5>{ productData.name}</h5>
                          <h6>{productData.description}</h6>
                      </div>
                      <button onClick={() => loadCheckout(productData.prices.priceId)}>Subscribe</button>
                      </div>
              );
          })}
          

    </div>
  )
}

export default PlansScreen