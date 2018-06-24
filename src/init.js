(function() {      
    var stagging = true;
    var local = false;
    
    var url= 'https://www.fixonclick.com';
    var promoUrl = 'https://promotions.fixonclick.com';      

    
    if(stagging) {
    url= "https://foctest.meteorapp.com"
    if(local)
        url = "http://localhost:3005";        
    // promoUrl = 'http://localhost:3004';
    promoUrl = 'https://foc-stage.herokuapp.com';
    }

    __meteor_runtime_config__ = {
    "meteorEnv": {},          
    "DDP_DEFAULT_CONNECTION_URL": url, 
    "ROOT_URL": url,
    "MOBILE_URL": url,
    "MOBILE_ROOT_URL": url
    };        
    // window.promoServer = promoUrl;
    // window.absoluteUrl = url;
    //
    
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