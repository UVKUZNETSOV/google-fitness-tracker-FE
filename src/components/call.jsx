import axios from 'axios';

const call = async (accessToken) => {
  try {
    const apiUrl = 'https://www.googleapis.com/fitness/v1/users/me/dataSources';
    const requestUrl = `https://www.googleapis.com/fitness/v1/users/me/dataSources/derived:com.google.step_count.delta:${accessToken}:Example%20Manufacturer:ExampleTablet:1000001:MyDataSource`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // var postData = {
    //   "dataStreamName": "MyDataSource",
    //   "type": "derived",
    //   "application": {
    //     "detailsUrl": "http://example.com",
    //     "name": "Foo Example App",
    //     "version": "1"
    //   },
    //   "dataType": {
    //     "field": [
    //       {
    //         "name": "steps",
    //         "format": "integer"
    //       }
    //     ],
    //     "name": "com.google.step_count.delta"
    //   },
    //   "device": {
    //     "manufacturer": "Example Manufacturer",
    //     "model": "ExampleTablet",
    //     "type": "tablet",
    //     "uid": "1000001",
    //     "version": "1.0"
    //   }
    // }

    axios.put(requestUrl, {
      "dataStreamId": `derived:com.google.step_count.delta:${accessToken}:Example Manufacturer:ExampleTablet:1000001:MyDataSource`,
      "dataStreamName": "MyDataSource",
      "type": "derived",
      "application": {
        "detailsUrl": "http://example.com",
        "name": "Foo Example App",
        "version": "1"
      },
      "dataType": {
        "field": [
          {
            "name": "steps",
            "format": "integer"
          }
        ],
        "name": "com.google.step_count.delta"
      },
      "device": {
        "manufacturer": "Example Manufacturer",
        "model": "ExampleTablet",
        "type": "tablet",
        "uid": "1000001",
        "version": "2.0"
      }
    }
    , {
      headers: {
        'Authorization': `Bearer ${accessToken}` 
      }
    })

    const response = await axios.get(apiUrl, { headers });

    console.log('API response:', response.data);

    return response.data;

  } catch (error) {
    console.error('Error: ', error);
  }
};

export default call;
