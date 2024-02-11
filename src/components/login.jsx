import { GoogleLogin } from 'react-google-login';

const clientId = '981464855440-qn1ngqsaedmttribeon0unr30k9ktebh.apps.googleusercontent.com';

function Login() {

  const onSuccess = (res) => {
    console.log("Login OK", res.profileObj);
    console.log("Login OK", res);
  }

  const onFailure = (res) => {
    console.log("Failure", res);
  }

  return(
    <div id="signInButton">
      <GoogleLogin 
        clientId={clientId}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy='single-host-origin'
        isSignedIn={true}
      />
    </div>
  )

}

export default Login;
