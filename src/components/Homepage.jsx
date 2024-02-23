import '../style/Homepage.css';
import logo from '../img/main-logo.png';
import background from '../img/background.png';
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import Steps from './steps'
import Heartrate from './heartrate';
import Callories from './callories';
import LoginButton from './login';
import call from './call';

const CLIENT_ID = "61433605438-3f0ajbbbntafustnuu26m1t96jouabj9.apps.googleusercontent.com";
const API_KEY = "AIzaSyAPNqvNfhyGJJfJjFFgrgI5ITaBrjOE8ko";
const SCOPES = "https://www.googleapis.com/auth/fitness.activity.read";
const CLIENT_SECRET = "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";

function Homepage() {

  const [stepCount, setStepCount] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    function start() {
      gapi.client.init({
        apikey: API_KEY,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        scope: SCOPES
      })
    }

    gapi.load('client:auth2', start);
  })

  function getAccess() {
    const access_token = gapi.auth.getToken().access_token;
    setAccessToken(access_token);
    const fetchData = async () => {
      try {
        const apiResponse = await call(access_token);

        const buckets = apiResponse.bucket || apiResponse.dataSets;

        let steps = 0;
        if (buckets) {
          for (const bucket of buckets) {
            if (bucket.activity && bucket.activity[0].type === 'com.google.step_count.delta') {
              steps += bucket.activity[0].steps;
            }
          }
        }

        setStepCount(steps);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }

  return (
    <div className="App" style={{ backgroundImage: `url(${background})`}}>
      <main>
        <img src={logo} alt="Logo" className="app__img"/>
        <h1 className="app__header">
          Google Fit Tracker
          <br/>
          <span>
            v2.0
          </span>
        </h1>
        <LoginButton />
        <Steps token={accessToken} />
        <Heartrate token={accessToken} />
        <Callories token={accessToken} />
        <button className='data-btn' onClick={() => getAccess()}>Get data</button>
        {/* <h1>Steps: {stepCount !== null ? stepCount : 'Click Get data'}</h1> */}
      </main>
    </div>
  );

}

export { Homepage }

