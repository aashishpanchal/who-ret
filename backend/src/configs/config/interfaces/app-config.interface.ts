export interface IConfig {
  env: string;
  isDev: boolean;
  host: string;
  port: number;
  db: {
    uri: string;
    dbName: string;
  };
  redis: {
    url: string;
  };
  jwt: {
    auth_header_type: string[];
    secret: string;
    auth_header_name: string;
    accessExp: string;
    refreshExp: string;
    issuer: string;
  };
  cloud: {
    name: string;
    api_key: string;
    api_secret: string;
    project: string;
  };
  twilio: {
    sid: string;
    token: string;
    phone_number: string;
  };
  otp: {
    exp: string;
    size: number;
  };
  companyName: string;
  max_page_size: number;
}
