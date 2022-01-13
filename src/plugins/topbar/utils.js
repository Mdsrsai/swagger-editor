import axios from 'axios';

export async function getGeneratorsList({ url }) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line prettier/prettier
      'Accept': 'application/json',
    },
  };
  const res = await axios.get(url, config);
  if (!res) {
    return { error: 'Network Error' };
  }
  if (res instanceof Error && res.message) {
    return { error: res.message }; // 'Request failed with status code 4xx'
  }
  if (res instanceof Error) {
    return { error: 'unknown error' };
  }
  return res.data;
}

export async function postGenerator3WithSpec({ url, data, options }) {
  // default generator 3 returns Blob
  // legacy generator 2 returns json
  const optionsResponseType = options?.responseType;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line prettier/prettier
      'Accept': ' application/octet-stream, application/json',
    },
    responseType: optionsResponseType || 'blob',
  };
  const res = await axios.post(url, data, config);
  if (!res) {
    return { error: 'Network Error' };
  }
  if (res instanceof Error && res.message) {
    return { error: res.message };
  }
  if (res instanceof Error) {
    return { error: 'unknown error' }; // statusCode: 400
  }
  return res; // response could be Blob or json object
}

export async function getDefinitionFromUrl({ url }) {
  const config = {};
  const res = await axios.get(url, config).catch((err) => err);
  if (!res) {
    return { error: 'Network Error' };
  }
  if (res instanceof Error && res.message) {
    return { error: res.message }; // 'Request failed with status code 404'
  }
  if (res instanceof Error) {
    return { error: 'unknown error' };
  }
  return res.data;
}

export async function getGenerator2Definition({ url }) {
  const config = { responseType: 'blob' };
  const res = await axios.get(url, config);
  if (!res) {
    return { error: 'Network Error' };
  }
  if (res instanceof Error && res.message) {
    return { error: res.message };
  }
  if (res instanceof Error) {
    return { error: 'unknown error' }; // statusCode: 400
  }
  return { data: res.data }; // expect res.data: Blob
}

export async function postPerformOasConversion({ url, data }) {
  const config = {
    headers: {
      'Content-Type': 'application/yaml',
      // eslint-disable-next-line prettier/prettier
      'Accept': 'application/yaml',
    },
  };
  const res = await axios.post(url, data, config);
  if (!res) {
    return { error: 'Network Error' };
  }
  if (res instanceof Error && res.message) {
    return { error: res.message };
  }
  if (res instanceof Error) {
    return { error: 'unknown error' }; // statusCode: 400
  }
  return res.data;
}
