const makeRequest = async (url, method, data = {}) => {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  
    return await response.json();
  };
  
  document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await makeRequest('/login', 'POST', { username, password });
      console.log('Login successful:', response);
      // Redireccionar o mostrar mensaje de éxito
    } catch (error) {
      console.error('Login error:', error.message);
      // Mostrar mensaje de error
    }
  });
  