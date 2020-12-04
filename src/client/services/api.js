const DEFAULT_OPTIONS = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const ERROR_RESPONSE = {
  data: null,
  errors: { server: "Server error" },
  messages: {},
  valid: false,
};

async function formatResponse(res) {
  try {
    const { data = null, errors = {}, messages = {} } = await res.json();
    return { data, errors, messages, valid: true };
  } catch (err) {
    console.error(err);
    console.error("Error formatting response");
    return ERROR_RESPONSE;
  }
}

function formatEndpoint(endpoint) {
  const prefix = process?.env?.REACT_APP_API_ENDPOINT ?? "";
  return `${prefix}${endpoint}`;
}

export default {
  async get(endpoint, options = {}) {
    try {
      const res = await fetch(formatEndpoint(endpoint), {
        ...DEFAULT_OPTIONS,
        ...options,
        method: "GET",
      });
      return formatResponse(res);
    } catch (err) {
      console.error(err);
      console.error("Error sending request");
      return ERROR_RESPONSE;
    }
  },
};
