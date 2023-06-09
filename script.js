const form = document.getElementById('questionnaire');
const recommendationDiv = document.getElementById('recommendation');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Get user's preferences
  const formData = new FormData(form);
  const preferences = {};
  for (let entry of formData.entries()) {
    preferences[entry[0]] = entry[1];
  }

  // Make a request to the ChatGPT API
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer API_KEY'
    },
    body: JSON.stringify({
      'model': 'gpt-3.5-turbo',
      'messages': [
        {'role': 'system', 'content': 'You are a user looking for trip recommendations.'},
        {'role': 'user', 'content': JSON.stringify(preferences)}
      ]
    })
  })
  .then(response => response.json())
  .then(data => {
    const recommendation = data.choices[0].message.content;
    recommendationDiv.innerHTML = `<p>${recommendation}</p>`;
    recommendationDiv.style.display = 'block'; // Show the block with the result
  })
  .catch(error => {
    console.error('Error:', error);
    recommendationDiv.innerHTML = '<p>An error occurred. Please try again later.</p>';
  });
});

const questionnaire = [
    { question: 'What is your preferred activity? (ex: sightseeing, adventure, relaxation)', name: 'destination' },
    { question: 'How many days will you be traveling?', name: 'duration' },
    { question: 'What is your budget in dollars?', name: 'budget' },
    // Add more questions as needed
  ];
  
  questionnaire.forEach(({ question, name }) => {
    const label = document.createElement('label');
    label.textContent = question;
  
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', name);
  
    form.insertBefore(label, form.lastElementChild);
    form.insertBefore(input, form.lastElementChild);
  });