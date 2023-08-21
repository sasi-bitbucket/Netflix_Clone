const [products, setProducts] = useState([]);
useEffect(() => {
    db.collection("products")
        .where("active", "==", true)
        .get()
        .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection('prices').get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            });
            setProducts(products);
        });

}, []);

const checkoutSessionsRef = collection(db, "customers", user.uid, "checkout_sessions");

// Add the new document
const docRef = await addDoc(checkoutSessionsRef, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin
});


const db = getFirestore(); // Assuming you've initialized Firebase

async function handleCheckoutSession() {
    // Get a reference to the specific location
    const checkoutSessionsRef = collection(db, "customers", user.uid, "checkout_sessions");

    // Add the new document
    const docRef = await addDoc(checkoutSessionsRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin
    });

    // Now, set up an onSnapshot listener on the newly added document
    const unsubscribe = onSnapshot(docRef, (snap) => {
        if (!snap.exists()) {
            console.log("Document not found");
            return;
        }
        const { error, sessionId } = snap.data();
        // Your logic here...
    });

    // If at any point you want to stop listening to changes, call:
    // unsubscribe();
}

// Invoke the function to perform the operations
handleCheckoutSession();


docRef.onSnapshot(async (snap) => {
    const { error, sessionId } = snap.data();
    if (error) {
        alert(`An error Ocurred : ${error.message}`);
    }
    if (sessionId) {
        const stripe = await loadStripe('pk_test_51Nee6cDch7H93XXPe97Kwn4t9o39XAlmOGCv8Yrii43k4HPKGC6an9EaSf0jW895lwHfxHD6b06K4kU3xcZ1iI8V00QRboW82K');
        stripe.redirectToCheckout({ sessionId });
    }
})