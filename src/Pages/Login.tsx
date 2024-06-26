import { css } from "@emotion/css"
import { body, buttons, breakpoint, colors, theme, links } from "../View/Theme"
import { State } from "../State"
import * as LoginAction from "../Action/Login"
import { emit } from "../Emit"
import { createEmail } from "../../../core/Data/User/Email"
import { fromMaybe } from "../../../core/Data/Maybe"
import { createPassword } from "../../../core/Data/User/Password"
import { pushModal } from "../Action"

type Props = { state: State }
function View({ state }: Props): JSX.Element {
  const { email, password, data } = state.login
  const disabled =
    data._t === "Loading" ||
    fromMaybe(createEmail(email)) == null ||
    fromMaybe(createPassword(password)) == null
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.title}>LOGIN</div>
        <form className={styles.form}>
          <div className={styles.formTitle}>Email</div>
          <input
            className={styles.formInput}
            value={email}
            onChange={(e) => emit(LoginAction.changeEmail(e.target.value))}
          />
          <div className={styles.formTitle}>Password</div>
          <input
            className={styles.formInput}
            value={password}
            onChange={(e) => emit(LoginAction.changePassword(e.target.value))}
            type={"password"}
          />
          <button
            type="submit"
            className={styles.formButton}
            disabled={disabled}
            onClick={() => emit(LoginAction.submit)}
          >
            Submit
          </button>
        </form>
        <div className={styles.termAndPrivacy}>
          <a
            className={styles.linkButton}
            onClick={() => emit(pushModal("TermsAndConditions"))}
          >
            Terms and Conditions
          </a>
          <a
            className={styles.linkButton}
            onClick={() => emit(pushModal("PrivacyPolicies"))}
          >
            Privacy Policies
          </a>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    padding: theme.s4,
  }),
  box: css({
    width: "80%",
    maxWidth: "unset",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.s8,
    gap: theme.s4,
    borderRadius: theme.br4,
    border: `1px solid ${colors.neutral300}`,
    boxShadow: theme.elevation.medium,
    background: colors.neutral100,
    ...breakpoint.sm({
      width: "50%",
      maxWidth: theme.s82,
    }),
  }),
  title: css({
    ...body.large.medium,
    color: colors.blue500,
  }),
  form: css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.s2,
  }),
  formTitle: css({
    ...body.small.regular,
    color: colors.blue500,
  }),
  formInput: css({
    ...body.small.regular,
    color: colors.neutral800,
    padding: `${theme.s1} ${theme.s2}`,
    borderRadius: theme.br2,
    border: `1px solid ${colors.neutral300}`,
    boxShadow: theme.elevation.small,
  }),
  formButton: css({
    ...buttons.primary.s2,
    marginTop: theme.s2,
  }),
  termAndPrivacy: css({
    display: "flex",
    gap: theme.s6,
  }),
  linkButton: css({
    ...links.s2,
  }),
}

export default View
