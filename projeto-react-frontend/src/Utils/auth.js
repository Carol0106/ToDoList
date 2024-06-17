export const isAuthenticated = () => {
    const authToken = localStorage.getItem('authToken');
    return !!authToken;
  };
  
  export const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  
  export const removeAuthToken = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  };