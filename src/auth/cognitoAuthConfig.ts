import { COGNITO_AUTHORITY, COGNITO_CLIENT_ID, LOGIN_REDIRECT, LOGOUT_REDIRECT } from "@/config";

export const cognitoAuthConfig = {
    authority: COGNITO_AUTHORITY,
    client_id: COGNITO_CLIENT_ID,
    redirect_uri: LOGIN_REDIRECT,
    post_logout_redirect_uri: LOGOUT_REDIRECT,
    response_type: "code",
    scope: "email openid phone",
    onSigninCallback: () => {
        window.history.replaceState({}, document.title, "/");
    },
};
