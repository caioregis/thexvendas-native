const RequestBluetoothPermission = async() => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH, {
                title: 'Location permission for bluetooth scanning',
                message: 'wahtever',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        ); 
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission for bluetooth scanning granted');
            return true;
        } else {
            console.log('Location permission for bluetooth scanning revoked');
            return false;
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
}
export {RequestBluetoothPermission}