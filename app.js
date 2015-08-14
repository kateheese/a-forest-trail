(function() {
  var userStatus = {
    energy: 100
  };

  var status = document.getElementById("status");
  for(key in userStatus) {
    status.innerHTML = status.innerHTML + "<div>" + key + ": " + userStatus[key] + "</div>";
  }
})();