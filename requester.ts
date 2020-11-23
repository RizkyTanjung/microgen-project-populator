const BACKEND_ENDPOINT = "https://testandi1606118586344.microgen.mejik.id"

import axios, { AxiosResponse } from "axios";

import * as https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const httpRequest = axios.create({
  baseURL: BACKEND_ENDPOINT + "/api",

});


/**
 * @param { object } - param is required, you can provided param like header args in axios
 */
class BackendService {
  constructor({ header }: { header: any }) {
    this.setHeader(header);
  }

  setHeader = (header: any) => {
    httpRequest.defaults.headers = {
      ...header,
      httpsAgent: agent,
    };
  };

  private queryBuilder = (query: object): string => {
    if (Object.keys(query).length) {
      const nonFieldQuery: string[] = [];
      const fieldQuery: string[] = [];

      for (const [key, value] of Object.entries(query)) {
        if (["limit", "orderBy", "select", "skip"].includes(key)) {
          nonFieldQuery.push(`${key}=${value}`);
        } else {
          fieldQuery.push(`where[${key}]=${value}`);
        }
      }

      let queryParams = "?" + fieldQuery.join("&");
      if (nonFieldQuery.length) {
        queryParams += "&" + nonFieldQuery.join("&");
      }
      return queryParams;
    }
    return "";
  };

  get = async ({
    tableName,
    id,
  }: {
    tableName: string;
    id: string;
  }): Promise<AxiosResponse> => {
    return await httpRequest.get("/" + tableName + "/" + id);
  };

  find = async ({
    tableName,
    query = {},
  }: {
    tableName: string;
    query?: object;
  }): Promise<AxiosResponse> => {
    return await httpRequest.get("/" + tableName + this.queryBuilder(query));
  };

  create = async ({
    tableName,
    body,
  }: {
    tableName: string;
    body: object;
  }): Promise<AxiosResponse> => {
    return await httpRequest.post(tableName, body,);
  };

  patch = async ({
    tableName,
    id,
    body,
  }: {
    tableName: string;
    id: string;
    body: object;
  }): Promise<AxiosResponse> => {
    return await httpRequest.post("/" + tableName + "/" + id, body);
  };

  remove = async ({
    tableName,
    id,
  }: {
    tableName: string;
    id: string;
  }): Promise<AxiosResponse> => {
    console.log('call removeq')
    const a = await httpRequest.delete("/" + tableName + "/" + id);
    console.log('a',a)
    return a
  };

  removeMany = async ({
    tableName,
    ids,
  }: {
    tableName: string;
    ids: string[];
  }) => {
    const execsDelete = ids.map((id) => this.remove({ tableName, id }));
    return await Promise.all(execsDelete);
  };
}

export default BackendService
