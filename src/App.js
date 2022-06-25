import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const App = () => {
  const [deviceIds, setDeviceIds] = useState([]);
  const [resources, setResources] = useState([]);

  const fetchData = () => {
    const deviceAPI = 'https://mockapi.lumi.systems/getdevices?userId=100&orgId=Lumi';
    const resourcesVideo = 'https://mockapi.lumi.systems/getdevicedata?deviceId=LabEye-dVr';

    const getDevice = axios.get(deviceAPI, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      }
    });

    const getResoureces = axios.get(resourcesVideo, {
      header: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      }
    });

    //const getDevice = axios.get(deviceAPI);
    //const getResoureces = axios.get(resourcesVideo);

    axios.all([getDevice, getResoureces]).then(
      axios.spread((...allData) => {
        //const allDataDevice = allData[0]
        //const allDataResources = allData[1]

        const allDataDevice = allData[0]                                     //[0].data.first_name
        const allDataResources = allData[1].videofiles                            //config.url

        setDeviceIds(allDataDevice)
        setResources(allDataResources)

        //console.log(allDataDevice)
        //console.log(allDataResources)
      })
    )
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="App">
      Device Id: {deviceIds}
      <video width="750" height="500" controls>
        <source src={resources} type="video/mp4" />
      </video>
    </div>
  );
}

export default App;
