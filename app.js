(function() {
  var userStatus = {
    energy: 100,
    steps: 0
  };

  //get the status div
  var status = document.getElementById("status");

  //display user status if greater than zero
  function updateUserStatus() {
    status.innerHTML = '';
    for(key in userStatus) {
      if (userStatus[key] > 0) {
        var div = document.createElement("div");
        div.innerHTML = "<div>" + key + ": " + userStatus[key] + "</div>";
        status.appendChild(div);
      };
    };
  };

//get 'walk the trail' button
var walkButton = document.getElementById('walk');


//Events that occur when the 'walk the trail' button is clicked
walkButton.addEventListener('click', function() {
  //disable the button
  this.setAttribute("disabled", "true");
  //enable button after 3 seconds
    setTimeout(function() {
        walkButton.removeAttribute("disabled");
    }, 3000);
  //increases number of steps by 1 with each click
  userStatus.steps += 1;
  //Update the DOM with each click
  updateUserStatus();
  //display'you continue down the trail' to the left after each click
  var walkingText = document.createElement("div");
  walkingText.innerHTML = 'you continue down the trail';
  document.getElementById('left').appendChild(walkingText);
});

//Update DOM on page load
updateUserStatus();

})();
