(function() {      
    const url = 'https://example-meteorjs-server.com'

    __meteor_runtime_config__ = {
    "meteorEnv": {},          
    "DDP_DEFAULT_CONNECTION_URL": url, 
    "ROOT_URL": url,
    "MOBILE_URL": url,
    "MOBILE_ROOT_URL": url
    };        
    
    //un-comment this code to enable service worker
    // if ('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('service-worker.js')
    // .then((registeration) => {
    //     window.swRegisteration = registeration;
    //     registeration.onupdatefound = () => {
    //     window.appIsOldVersion = registeration;
    //     }
    // })
    // .catch(err => console.error('Error', err));
    // }
})();