console.log('SW loaded......');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('Push recived.......');

    self.registration.showNotification(data.title, {
        body: 'Notify by Traversy Media',
        icon: 'https://www.svgrepo.com/show/286047/papaya.svg'
    });
})