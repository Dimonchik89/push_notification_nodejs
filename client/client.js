const publicVapidKey = 'BJEHpRyYsV0YEDZOt7idN-Lf7MVIyiPAMwuyUllc2LZ5GsYKKdmfHYCiEmv4R6QmKHVpk5aNP6ygJjdW6-L4y-E';

// Check for service worker
if("serviceWorker" in navigator) {
    send().catch(err => console.error(err));
}

// Register SW, Register push, Send Push
async function send() {
    //Register SW
    console.log('Registering SW.........');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    })
    console.log('SW register.......');

    //Register Push
    console.log('Registering Push..........');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
    console.log('Push Registered..............');

    // Send Push Notificatio
    console.log('Sending Push................');
    await fetch('/subscribe', {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    })
    console.log('Push send...............');
}


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for(let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}