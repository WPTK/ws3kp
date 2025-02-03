const fetchAsync = async (url, responseType = 'json', params = {}) => {
    params = { method: 'GET', mode: 'cors', retryCount: 0, ...params };

    let fetchUrl = params.cors ? rewriteUrl(url) : url;
    if (params.data) {
        fetchUrl += '?' + new URLSearchParams(params.data).toString();
    }

    for (let i = 0; i <= params.retryCount; i++) {
        try {
            const response = await fetch(fetchUrl, params);
            if (!response.ok) throw new Error(`Error ${response.status} - ${response.statusText}`);
            return responseType === 'json' ? response.json() : response.text();
        } catch (error) {
            console.error(`Attempt ${i + 1} failed: ${error.message}`);
            if (i < params.retryCount) {
                await new Promise((resolve) => setTimeout(resolve, [1000, 2000, 5000, 10000, 30000][i] || 30000));
            }
        }
    }
    throw new Error(`Failed to fetch ${url} after ${params.retryCount} retries`);
};

export { fetchAsync };
