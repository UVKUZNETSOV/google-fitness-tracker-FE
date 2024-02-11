import { useEffect, useRef } from 'react'
import { jwtDecode } from 'jwt-decode'
// import { gapi } from 'gapi-script';

const loadScript = (src) =>
new Promise((resolve, reject) => {
  if (document.querySelector(`script[src="${src}"]`)) return resolve()
  const script = document.createElement('script')
  script.src = src
  script.onload = () => resolve()
  script.onerror = (err) => reject(err)
  document.body.appendChild(script)
})

const GoogleAuth = () => {

  const googleButton = useRef(null);

  useEffect(() => {
    const src = 'https://accounts.google.com/gsi/client'
    const id = "981464855440-qn1ngqsaedmttribeon0unr30k9ktebh.apps.googleusercontent.com"

    loadScript(src)
      .then(() => {
        /*global google*/
        console.log(google)
        

        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        })
        google.accounts.id.renderButton(
          googleButton.current, 
          { theme: 'outline', size: 'large' } 
        )
      })
      .catch(console.error)
      }, [])

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const decoded = () => {
      jwtDecode(response.credential);
    }
    console.log(decoded);
  }

  return (
    <div ref={googleButton}></div>
  )
}

export default GoogleAuth