export const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_U2UOXVhrX",
    client_id: "4ih0t549ecd43jp2nmnhakoems",
    redirect_uri: "http://localhost:5173/dashboard",
    post_logout_redirect_uri: "http://localhost:5173/",
    response_type: "code",
    scope: "email openid phone",
};