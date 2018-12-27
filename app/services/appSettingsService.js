app.factory('appSettingsService', ['$q','$http','$rootScope',function ($q,$http,$rootScope) {

    var global = {};    

    global.getSettings = function(appId,masterKey){
      var q=$q.defer();

      var params = {};
      params.key = masterKey;       

      var data = new FormData();
      data.append('key', masterKey);

      var xhttp = new XMLHttpRequest();
      xhttp.onload  = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          if(xhttp.responseText){
            var resp=JSON.parse(xhttp.responseText);
            q.resolve(resp);
          }            
        }else if(xhttp.status!==200){
          q.reject(xhttp.responseText);
        }
      };
      xhttp.open("POST", SERVER_URL+'/settings/'+appId, true);        
      xhttp.send(data);

      return  q.promise;
    };

    global.putSettings = function(appId,masterKey,categoryName,settingsObject){
      var q=$q.defer();
      
      var data = new FormData();        
      data.append('key', masterKey);
      data.append('settings', JSON.stringify(settingsObject));

      var xhttp = new XMLHttpRequest();
      xhttp.onload  = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
          if(xhttp.responseText){
            var resp=JSON.parse(xhttp.responseText);
            q.resolve(resp);
          }            
        }else if(xhttp.status != 200){
          q.reject(xhttp.responseText);
        }
      };
      xhttp.open("PUT", SERVER_URL+'/settings/'+appId+'/'+categoryName, true);        
      xhttp.send(data);

      return  q.promise;
    };

    global.upsertAppSettingFile = function(appId,masterKey,fileObj,category){
      var q=$q.defer();
      
      var data = new FormData();        
      data.append('file', fileObj);        
      data.append('key', masterKey);        

      var xhttp = new XMLHttpRequest();
      xhttp.onload  = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
          if(xhttp.responseText){            
            q.resolve(xhttp.responseText);
          }            
        }else if(xhttp.status != 200){
          q.reject(xhttp.responseText);
        }
      };
      xhttp.open("PUT", SERVER_URL+'/settings/'+appId+'/file/'+category, true);        
      xhttp.send(data);

      return  q.promise;
    };

    global.exportDatabase = function(appId,masterKey){
      var q=$q.defer();
      var data = new FormData();     
      data.append('key', masterKey);        

      var xhttp = new XMLHttpRequest();
      xhttp.onload  = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
          var blob = new Blob([xhttp.responseText], {type: "text/plain;charset=utf-8"});
          saveAs(blob, "dump.json");
          q.resolve(true);
        }else if(xhttp.status != 200){
          q.reject(xhttp.responseText);
        }
      };
      xhttp.open("POST", SERVER_URL+"/backup/"+appId+"/exportdb", true);        
      xhttp.send(data);
      return  q.promise;
    }

    global.importDatabase = function(appId,masterKey,fileObj){
      var q=$q.defer();
      
      var data = new FormData();        
      data.append('file', fileObj);        
      data.append('key', masterKey);        

      var xhttp = new XMLHttpRequest();
      xhttp.onload  = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
          if(xhttp.responseText){            
            q.resolve(xhttp.responseText);
          }            
        }else if(xhttp.status != 200){
          q.reject(xhttp.responseText);
        }
      };
      xhttp.open("POST", SERVER_URL+"/backup/"+appId+"/importdb", true);        
      xhttp.send(data);

      return  q.promise;
    }

    global.getAccessUrl = function(appId){
      return $http.post(frontendServerURL+"/dbaccess/get/"+appId,{})
    }

    global.enableAccessUrl = function(appId){
      return $http.post(frontendServerURL+"/dbaccess/enable/"+appId,{})
    }

    return global;

}]);
