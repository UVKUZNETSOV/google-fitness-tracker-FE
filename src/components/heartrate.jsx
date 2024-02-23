const Heartrate = (props) => {
  const accessToken = props.token;

  const writeToGoogleFit = async () => {
    const startTimeMillis = new Date('2024-02-20T00:00:00Z').getTime();
    const endTimeMillis = new Date('2024-02-21T00:00:00Z').getTime();

    const url = `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`;

    const requestData = {
      aggregateBy: [{
        dataTypeName: 'com.google.heart_rate.bpm',
        dataSourceId: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm'
      }],
      bucketByTime: { durationMillis: 86400000 }, // Данные за сутки
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
        console.log('Данные о сердцебиении успешно получены из Google Fit:', data);
      } else {
        console.error('Ошибка получения данных о сердцебиении из Google Fit:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка получения данных о сердцебиении из Google Fit:', error);
    }
  };

  return (
    <div>
      <h2>Получение данных о сердцебиении из Google Fit</h2>
      <button onClick={writeToGoogleFit}>Получить данные</button>
    </div>
  );
};

export default Heartrate;
