window.addEventListener('load', async () => {

//Checking if the Service Workers is supported in the Browser
try {
    //store
    const swRegistration = await navigator.serviceWorker.register('/service_worker.js');
    console.log('Service worker has been successfully registered', swRegistration)
} catch (error) {
    console.error('Service worker registration failure');
}



})