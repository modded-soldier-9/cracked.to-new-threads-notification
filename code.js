// Replace 'https://your-webhook-url' with your Discord webhook URL
const discordWebhookUrl = 'https://your-discord-webhook-url';

// Callback function to handle mutations
function handleMutations(mutations) {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const textElement = node.querySelector('.text');
        if (textElement && textElement.textContent.includes('New thread')) {
          const link = textElement.querySelector('a')?.getAttribute('href') || ''; // Extract the href attribute
          const message = `${textElement.textContent} Link: ${link}\n`; // Add a newline character at the end
          sendDataToWebhook(message);
        }
      }
    });
  });
}

// Function to send data to the Discord webhook
function sendDataToWebhook(message) {
  const data = {
    content: message, // Content of the message
  };

  fetch(discordWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.ok) {
        console.log('Message sent to Discord successfully');
      } else {
        console.error('Failed to send message to Discord');
      }
    })
    .catch(error => {
      console.error('Error while sending message:', error);
    });
}

// Create a MutationObserver instance
const observer = new MutationObserver(handleMutations);

// Start observing the document with the configured parameters
observer.observe(document, { childList: true, subtree: true });
