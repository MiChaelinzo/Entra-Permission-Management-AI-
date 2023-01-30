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
  
  // Train the machine learning model with the user's browsing history

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
  
  
  
 // Use the trained model to grant or block permissions

      // Use the history data and the trained model to make a decision on granting or blocking the permission
      // ...
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
      // Create a UI component for manually granting or blocking permissions
var grantPermissionBtn = document.createElement("button");
grantPermissionBtn.innerHTML = "Grant Permission";
document.body.appendChild(grantPermissionBtn);

var blockPermissionBtn = document.createElement("button");
blockPermissionBtn.innerHTML = "Block Permission";
document.body.appendChild(blockPermissionBtn);

// Listen for clicks on the buttons and perform the appropriate action
grantPermissionBtn.addEventListener("click", function(){
  var url = prompt("Enter the website URL:");
  chrome.permissions.request({
    origins: [url]
  }, function(granted) {
    if (granted) {
      console.log("Permission granted for " + url);
    } else {
      console.log("Permission not granted for " + url);
    }
  });
});

blockPermissionBtn.addEventListener("click", function(){
  var url = prompt("Enter the website URL:");
  chrome.permissions.remove({
    origins: [url]
  }, function(removed) {
    if (removed) {
      console.log("Permission removed for " + url);
    } 


    else {
        console.log("Permission not removed for " + url);
      }
    });
  });
  
  // Create a UI component to display the current permissions
  var currentPermissionsContainer = document.createElement("div");
  currentPermissionsContainer.innerHTML = "Loading current permissions...";
  document.body.appendChild(currentPermissionsContainer);
  
  // Retrieve the current permissions and update the UI
  chrome.permissions.getAll(function(permissions) {
    var currentPermissions = "";
    permissions.origins.forEach(function(origin) {
      currentPermissions += origin + "<br>";
    });
    currentPermissionsContainer.innerHTML = currentPermissions;
  });

  // Create a UI component to display the browsing history summary
var historySummaryContainer = document.createElement("div");
historySummaryContainer.innerHTML = "Loading history summary...";
document.body.appendChild(historySummaryContainer);

// Retrieve the browsing history data and update the UI
chrome.history.search({text: '', startTime: 0, maxResults: 10000}, function(data) {
  var historySummary = "";
  data.forEach(function(page) {
    historySummary += "URL: " + page.url + "<br>";
    historySummary += "Title: " + page.title + "<br>";
    historySummary += "Visit Count: " + page.visitCount + "<br>";
    historySummary += "Last Visit Time: " + new Date(page.lastVisitTime) + "<br><br>";
  });
  historySummaryContainer.innerHTML = historySummary;
});

    });
  });
  
   
  
