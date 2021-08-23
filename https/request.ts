// axios
import AxiosInstance from "../config/AxiosConfig";
// types
import { REQUEST_TYPE } from "../types/common";

const requireParam = (msg: string) => {
  throw Error(msg);
};

// payload la data
const request = ({
    url = requireParam("Url is undefined"),
    method = "POST",
    payload,
    params,
    cbSuccess,
    cbError,
    LOADING_ACTION,
    SUCCESS_ACTION,
    ERROR_ACTION,
  }: REQUEST_TYPE) => (dispatch) => {
    dispatch({
      type: LOADING_ACTION,
    });
    return AxiosInstance.request({
      url,
      method,
      data: payload,
      params,
    })
      .then((res: { [key: string]: any }) => {
        dispatch({
          type: SUCCESS_ACTION,
          payload: res?.data?.data,
        });
        if (cbSuccess) cbSuccess({ payload: res?.data?.data });
      })
      .catch(async (error: { [key: string]: any }) => {
        dispatch({
          type: ERROR_ACTION,
          payload: { error },
        });
        if (cbError) cbError(url, error);
      });
  };

export default request;
