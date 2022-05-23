const Worker = 'debug';
const IPS = {
  debug: 'http://192.168.1.107:3000',
  tst: 'http://192.168.1.107:3000',
};

const _Req = (url, verb, successCaller, data, errorCaller) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  let config = null;

  if (verb == 'GET' || verb == 'DELETE') {
    config = {
      method: verb,
      headers: headers,
    };
  } else {
    config = {
      method: verb,
      headers: headers,
      body: JSON.stringify(data),
    };
  }

  fetch(url, config)
    .then(response => response.json())
    .then(responseJson => {
      successCaller(responseJson);
    })
    .catch(error => {
      errorCaller(error);
    });
};

const SavePersonalData = (params, success, error) => {
  let http = `${IPS[Worker]}/usuarios`;
  let verb = 'POST';

  _Req(http, verb, success, params, error);
};

const UpdatePersonalData = (id, params, success, error) => {
  let http = `${IPS[Worker]}/usuarios/${id}`;
  let verb = 'PUT';

  _Req(http, verb, success, params, error);
};

const DeletePersonalData = (id, success, error) => {
  let http = `${IPS[Worker]}/usuarios/${id}`;
  let verb = 'DELETE';

  _Req(http, verb, success, error);
};

const SaveBluetoothData = (params, success, error) => {
  let http = `${IPS[Worker]}/bluetooths`;
  let verb = 'POST';

  _Req(http, verb, success, params, error);
};

const ListPersonalData = (success, error) => {
  let http = `${IPS[Worker]}/usuarios`;
  let verb = 'GET';

  _Req(http, verb, success, error);
};

const ListBluetoothData = (success, error) => {
  let http = `${IPS[Worker]}/bluetooths`;
  let verb = 'GET';

  _Req(http, verb, success, error);
};

export {
  SavePersonalData,
  UpdatePersonalData,
  DeletePersonalData,
  SaveBluetoothData,
  ListPersonalData,
  ListBluetoothData,
};
