// Collect data on the user's browsing history and habits
chrome.history.onVisited.addListener(function(historyItem) {
    var data = {
      url: historyItem.url,
      time: Date.now()
    };
    chrome.storage.local.get('history', function(result) {
      var history = result.history || [];
      history.push(data);
      chrome.storage.local.set({'history': history});
    });
  });
  
  
    // Use the history data to train the model
function trainModel() {
    chrome.storage.local.get('history', function(result) {
      var history = result.history;
      // preprocessing the data
      var data = preprocessData(history)
      //Splitting the data into training and testing sets
      var X_train,X_test,y_train,y_test = splitData(data)
      //Initializing the model
      var model = initializeModel()
      // Fitting the model with training data
      model.fit(X_train, y_train)
      // Saving the model
      saveModel(model)
    });
  }
  
  
  
 
      // Use the history data and the trained model to make a decision on granting or blocking the permission
      // ...// Use the history data and the trained model to make a decision on granting or blocking the permission
chrome.permissions.onBeforeRequest.addListener(function(permission) {
    chrome.storage.local.get('history', function(result) {
      var history = result.history;
      // preprocessing the data
      var data = preprocessData(history)
      // loading the model
      var model = loadModel()
      // making decision
      var decision = model.predict(data)
      if(decision == "grant"){
          // grant permission
      }else{
          // block permission
      }
    });
  });
  
   
  