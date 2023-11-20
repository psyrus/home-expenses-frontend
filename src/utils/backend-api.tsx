type ApiRequest = {
  headers: any,
  method: string,
  body?: string
}

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

  createOptions(method: string, body: any = null): object {
    let options: ApiRequest = {
      headers: { ...this.commonHeaders, 'Authorization': `Bearer ${this.token}` },
      method: method,
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    return options;
  };

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

  async getGroups() {
    const expensesEndpoint: string = this.createFullEndpoint("/groups");
    const requestOptions = this.createOptions('GET')
    const response = await fetch(expensesEndpoint, requestOptions);
    const content = await response.json();
    return content;
  }

  async getGroupMembers(groupId: number) {
    const expensesEndpoint: string = this.createFullEndpoint(`/group/${groupId}/members`);
    const requestOptions = this.createOptions('GET')
    const response = await fetch(expensesEndpoint, requestOptions);
    const content = await response.json();
    return content;
  }

  async updateExpense(id: number, payload: any) {
    const expensesEndpoint: string = this.createFullEndpoint(`/expense/${id}`);
    const requestOptions = this.createOptions('PATCH', payload)
    const response = await fetch(expensesEndpoint, requestOptions);
    const content = await response.json();
    return content;
  }

  async addExpense(payload: any) {
    const expensesEndpoint: string = this.createFullEndpoint(`/expense`);
    const requestOptions = this.createOptions('POST', payload)
    const response = await fetch(expensesEndpoint, requestOptions);
    const content = await response.json();
    return content;
  }
}

export default ApiClient;
