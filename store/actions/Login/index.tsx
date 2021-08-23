// types
import { TYPES } from "../../../constants/Login";
// others
import request from "../../../https/request";
import { ASYNC_ACTION_TYPE } from "../../../types/common";

export const login = ({ cbSuccess, cbError }: ASYNC_ACTION_TYPE = {}) =>
  request({
    url: `member/login.php`,
    method: "POST",
    cbSuccess,
    cbError,
    LOADING_ACTION: TYPES.POST_LOGIN,
    SUCCESS_ACTION: TYPES.POST_LOGIN_SUCCESS,
    ERROR_ACTION: TYPES.POST_LOGIN_FAILURE,
  });
