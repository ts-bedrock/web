import {
  ApiResponse,
  apiErrorString,
  ApiError,
  authNoneBodyApi,
} from "../../Api"
import {
  contract,
  ErrorCode,
  UrlParams,
  Payload,
} from "../../../../core/Api/User/Detail"

export type { ErrorCode, Payload }
export type Response = ApiResponse<ErrorCode, Payload>

export async function call(
  token: string,
  params: UrlParams,
): Promise<Response> {
  return authNoneBodyApi(token, contract, params)
}

export function errorString(code: ApiError<ErrorCode>): string {
  return apiErrorString(code, (code) => {
    switch (code) {
      case "USER_NOT_FOUND":
        return "User not found."
    }
  })
}
