import { useEffect, useState } from "react";
import ShopStore from '../../store/ShopStore.jsx';

// Carica la libreria di Stripe con la chiave pubblica per poter interagire con l’API di Stripe.
import { loadStripe } from "@stripe/stripe-js";
// Componente fornito da Stripe che avvolge il form e gestisce la comunicazione con Stripe.
import { Elements } from "@stripe/react-stripe-js";
// Componente personalizzato dove l’utente inserirà i dettagli di pagamento.
import CheckoutForm from "./CheckoutForm";



/**
 * Flusso di esecuzione:
 * 
 * 1) Chiamata a /config: Ottiene la chiave pubblica di Stripe e la utilizza per caricare il client.
 * 2) Chiamata a /create-payment-intent: Ottiene un clientSecret che identifica il pagamento in corso.
 * 3) Renderizza CheckoutForm: L’utente inserisce i dettagli di pagamento.
 * 4) Stripe verifica il pagamento tramite il clientSecret e lo conferma: utilizza il clientSecret per assicurarsi che ogni transazione sia 
 *    autenticata in modo univoco.
 * 5) Se il pagamento ha successo, viene notificato all’utente.
 */

/**
 * Come funziona correttamente?
 * 
 * 1) Sul frontend: Fai una richiesta POST all’endpoint del backend, passando eventuali dettagli del pagamento (importo, descrizione, ecc.) nel 
 *    corpo della richiesta.
 * 2) Sul backend: Il server crea il Payment Intent con stripe.paymentIntents.create() e restituisce il clientSecret.
 * 3) Sul frontend: Ricevi il clientSecret e lo utilizzi per finalizzare il pagamento.
 */

function Payment() {
  const { getTotalCartAmount } = ShopStore();

  // Oggetto che memorizza la promessa restituita da loadStripe() quando viene caricata la chiave pubblica di Stripe.
  const [stripePromise, setStripePromise] = useState(null);
  // Oggetto che memorizza il clientSecret fornito dal backend, necessario per iniziare il pagamento.
  const [clientSecret, setClientSecret] = useState("");

  // Recupera l'oggetto Stripe in maniera asincrona tramite la funzione loadStripe e la chiave pubblica!
  useEffect(() => {
    // Effettua una chiamata GET all’endpoint /config del backend per ottenere la chiave pubblica di Stripe.
    fetch("/config").then(async (r) => {
      // Carica la chiave pubblica di Stripe dal backend.
      const { publishableKey } = await r.json();
      // Recupero e settaggio della promise.
      setStripePromise(loadStripe(publishableKey));
    });
    // Viene eseguito una sola volta (array delle dipendenze è vuoto)!!!
  }, []);

  // Il backend crea un "Payment Intent" tramite l'API di Stripe e restituisce un clientSecret.
  useEffect(() => {
    const totalAmount = getTotalCartAmount();

    // Esegue una chiamata POST al backend sull’endpoint /create-payment-intent.
    fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // This is critical to parse JSON
      },
      body: JSON.stringify({
        amount: totalAmount,  // Passa l'importo al backend.
      }),
    }).then(async (result) => {
      // Recupera il clientSecret generato dalla chiamata.
      const { clientSecret } = await result.json();
      // Settaggio del clientSecret (viene utilizzato per autenticare e finalizzare il pagamento).
      setClientSecret(clientSecret);
    });
    // // Viene eseguito una sola volta (array delle dipendenze è vuoto)!!!
  }, []);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        // Renderizza l’elemento di pagamento sul componente CheckoutForm utilizzando la business logic di Stripe.
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
