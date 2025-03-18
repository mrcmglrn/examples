import { useState } from "react";
// useStripe: Hook per accedere all'istanza di Stripe, necessaria per gestire le operazioni di pagamento.
// useElements: Hook per accedere agli elementi di Stripe, che contengono i campi di pagamento (es. carta di credito, Apple Pay, ecc.).
import { useStripe, useElements } from "@stripe/react-stripe-js";
// Componente fornito da Stripe che mostra un'interfaccia di pagamento predefinita (può includere diversi metodi di pagamento come carte, 
// portafogli digitali, ecc.).
import { PaymentElement } from "@stripe/react-stripe-js";

/**
 * Flusso di esecuzione:
 * 
 * 1) L’utente apre il form di pagamento e Stripe carica il PaymentElement.
 * 2) L’utente inserisce i dettagli di pagamento e clicca su "Pay now".
 * 3) Il form richiama handleSubmit, che invia il pagamento a Stripe.
 * 4) Stripe elabora il pagamento e reindirizza l’utente a return_url in caso di successo.
 * 5) Eventuali errori vengono mostrati direttamente sul form.
 */

// Il componente CheckoutForm è un modulo di pagamento integrato con Stripe che utilizza il Payment Element. 
// Questo componente consente all'utente di inserire i dettagli del pagamento e confermare la transazione.
export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  // Memorizza eventuali messaggi di errore o successo da mostrare all’utente.
  const [message, setMessage] = useState(null);
  // Stato booleano che indica se il pagamento è in corso. Serve a disabilitare il pulsante per evitare invii multipli.
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    // Blocca l’invio predefinito del form con e.preventDefault().
    e.preventDefault();

    // Controlla se Stripe.js ed Elements sono caricati. Se non lo sono, impedisce l’elaborazione del pagamento!!!
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // Imposta isProcessing a true per indicare che il pagamento è in corso.
    setIsProcessing(true);

    // Conferma il pagamento utilizzando gli elementi forniti da Stripe.
    const { error } = await stripe.confirmPayment({
      elements, // Riferimento agli elementi del modulo di pagamento.
      confirmParams: { // URL al quale Stripe reindirizzerà l'utente dopo che il pagamento è stato completato.
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    // Alla fine del processo, lo stato isProcessing viene reimpostato a false per riabilitare il pulsante di invio.
    setIsProcessing(false);
  };

  // <PaymentElement>: Campo dinamico generato da Stripe. Può includere vari metodi di pagamento configurati (carte, wallet digitali, ecc.).
  return (
    <form id="payment-form" onSubmit={handleSubmit}>

      <PaymentElement id="payment-element" />

      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
