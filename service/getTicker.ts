import axios from "axios";
import _ from "lodash";

export const getTicket = axios.create({
  baseURL: `https://satangcorp.com/api/v3`,
});
