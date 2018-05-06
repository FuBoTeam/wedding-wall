const fetchData = ({ url = '', method = 'GET', data = null, type = 'json' }) => {
  return fetch(url, fetchOptions(method, data, type))
    .then(fetchResponse);
};

const fetchOptions = (method, data, type) => {
  const credentials = 'include';
  const headers = getHeaders(type);
  const body = getBody(data, type);

  return { ...{ credentials, headers, method }, ...body };
};

const fetchResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    const error = new Error(response.statusText);
    error.json = response;
    throw error;
  }
};

const getHeaders = (type) => {
  if (type === 'json') {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  return { 'Accept': '*.*' };
};

const getBody = (body, type) => {
  if (type === 'json') {
    return body ? { body: JSON.stringify(body) } : {};
  }

  return { body };
};
