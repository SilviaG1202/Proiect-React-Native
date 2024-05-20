export const baseUrl = 'http://163.172.177.98:8081';


export const fetchUserData = async (token: string) => {
  console.log(token); 
  const result = await fetch(`${baseUrl}/user/details/me`, {
      method: 'GET',
      headers: {
          ...baseHeaders,
          "Authorization": "Bearer " + token
      }
  });

  const data = await result.json(); 
  console.log(data)
  return data; 
};

export default fetchUserData;



const baseHeaders = {
  "Content-Type": 'application/json',
  "Accept": 'application/json'
}

export const login = async (email: string, password: string): Promise<{ token: string, userName: string }> => {
  console.log('Sending login request:', { email, password });

  const result = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      ...baseHeaders
    },
    body: JSON.stringify({ email, password })
  });

  console.log('Login response:', result);

  if (!result.ok) {
    const errorText = await result.text();
    throw new Error(`HTTP error! status: ${result.status}, message: ${errorText}`);
  }

  const data = await result.json();
  console.log('Login response data:', data);
  return { token: data.accessToken, userName: email };
};

export const register = async (email: string, password: string): Promise<{ token: string, userName: string }> => {
  console.log('Sending register request:', { email, password });

  const result = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { ...baseHeaders },
    body: JSON.stringify({ email, password })
  });

  console.log('Register response:', result);

  if (!result.ok) {
    const errorText = await result.text();
    throw new Error(`HTTP error! status: ${result.status}, message: ${errorText}`);
  }

  const data = await result.json();
  console.log('Register response data:', data);
  return { token: data.accessToken, userName: email };
};
