
export class ApiClient {
  apiEndpoint: string | undefined = process.env.REACT_APP_API_ENDPOINT;
  token: string | undefined;
  commonHeaders = {
    'Content-Type': 'application/json',
    'mode': 'no-cors',
  }
  constructor(token: string | undefined, apiEndpointOverride: string = "") {
    if (apiEndpointOverride.length > 0) {
      this.apiEndpoint = apiEndpointOverride
    }

    if (!this.apiEndpoint) {
      throw new Error("API endpoint could not be resolved.");
    }

    this.token = token;
  }

  createOptions(method: string): object {
    return {
      headers: { ...this.commonHeaders, 'Authorization': `Bearer ${this.token}` },
      method: method
    }
  }

  createFullEndpoint(path: string): string {
    return this.apiEndpoint + path;
  }

  async getExpenses() {
    const expensesEndpoint: string = this.createFullEndpoint("/expenses");
    const requestOptions = this.createOptions('GET')
    const response = await fetch(expensesEndpoint, requestOptions);
    const content = await response.json();
    return content;
  }

  async getUsers() {
    const usersEndpoint: string = this.createFullEndpoint("/users");
    const requestOptions = this.createOptions('GET')
    const response = await fetch(usersEndpoint, requestOptions);
    const content = await response.json();
    return content;
  }

  async getCurrentUser() {
    const userEndpoint: string = this.createFullEndpoint("/user/me");
    const requestOptions = this.createOptions('GET')
    const response = await fetch(userEndpoint, requestOptions);
    const content = await response.json();
    return content;
  }

  async getCategories() {
    const expensesEndpoint: string = this.createFullEndpoint("/categories");
    const requestOptions = this.createOptions('GET')
    const response = await fetch(expensesEndpoint, requestOptions);
    const content = await response.json();
    return content;
  }
}

export default ApiClient;
