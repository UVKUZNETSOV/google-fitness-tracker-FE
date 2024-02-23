const Steps = (props) => {
  const accessToken = props.token;

  const writeToGoogleFit = async () => {
    const startTimeMillis = new Date('2024-02-20T00:00:00Z').getTime();
    const endTimeMillis = new Date('2024-02-21T00:00:00Z').getTime();

    const url = `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`;

    const requestData = {
      aggregateBy: [{
        dataTypeName: 'com.google.step_count.delta',
        dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
      }],
      bucketByTime: { durationMillis: 86400000 }, 
      startTimeMillis: startTimeMillis,
      endTimeMillis: endTimeMillis
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Steps:', data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Запись данных в Google Fit</h2>
      <button onClick={writeToGoogleFit}>Записать данные</button>
    </div>
  );
};

export default Steps;
