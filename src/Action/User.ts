import {
  FullState,
  State,
  _Login,
  _PublicState,
  _Toast,
  _UserState,
  _UsersState,
  mapFullState,
} from "../State"
import type { PositiveInt } from "../../../core/data/PositiveInt"
import * as RemoteData from "../../../core/data/RemoteData"
import * as ApiUser from "../Api/User"
import type { Action, Cmd } from "../Action"

export function onEnterRoute(state: State, userID: PositiveInt): [State, Cmd] {
  return mapFullState((fullState: FullState) => {
    const { token, user } = fullState.authState

    return user.userID !== userID || user.data._t !== "Success"
      ? [
          _UserState(fullState, { data: RemoteData.loading() }),
          [ApiUser.call(token, { userID }).then((r) => userResponse(r))],
        ]
      : [fullState, []]
  }, state)
}

function userResponse(response: ApiUser.Response): Action {
  return (state: State) =>
    mapFullState((fullState: FullState) => {
      if (response._t === "Left") {
        return [
          _UserState(fullState, {
            data: RemoteData.failure(response.error),
          }),
          [],
        ]
      }
      return [
        _UserState(fullState, {
          data: RemoteData.success(response.value),
        }),
        [],
      ]
    }, state)
}