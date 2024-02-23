const Callories = (props) => {
  const accessToken = props.token;

  const fetchData = async () => {
    const startTimeMillis = new Date('2024-02-20T00:00:00Z').getTime();
    const endTimeMillis = new Date('2024-02-21T00:00:00Z').getTime();

    const url = `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`;

    const requestData = {
      aggregateBy: [{
        dataTypeName: 'com.google.calories.expended',
        dataSourceId: 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended'
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
        console.log('Callories:', data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Получение данных о калориях из Google Fit</h2>
      <button onClick={fetchData}>Получить данные</button>
    </div>
  );
};

export default Callories;
