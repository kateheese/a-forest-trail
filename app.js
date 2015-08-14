(function() {
  var userStatus = {
    energy: 100,
    steps: 0,
    berries: 0
  };

  //get the status div
  var status = document.getElementById("status");

  //display user status if greater than zero
  function updateUserStatus() {
    status.innerHTML = '';
    for(key in userStatus) {
      if (userStatus[key] > 0) {
        var div = document.createElement('div');
        div.innerHTML = '<div>' + key + ': ' + userStatus[key] + '</div>';
        status.appendChild(div);
      };
    };
  };

//get 'walk the trail' button
var walkBtn = document.getElementById('walk');

//Events that occur when the 'walk the trail' button is clicked
walkBtn.addEventListener('click', function() {
  //disable the button
  this.setAttribute('disabled', 'true');
  //enable button after 3 seconds
    setTimeout(function() {
        walkBtn.removeAttribute('disabled');
    }, 3000);
  //increases number of steps by 1 with each click
  userStatus.steps += 1;
  //Update the DOM with each click
  updateUserStatus();
  //display'you continue down the trail' to the left after each click
  var walkingText = document.createElement('div');
  walkingText.innerHTML = 'you continue down the trail';
  document.getElementById('left').appendChild(walkingText);

  if(userStatus.steps % 2 === 0) {
    //get buttons div
    var buttonsDiv = document.getElementById('buttons');    
    //create 'pick berrie' button
    var berryBtn = document.createElement('button');
    berryBtn.id = 'pick-berries'
    berryBtn.innerHTML = 'pick berries';
    //add 'pick berries' button to buttons div
    buttonsDiv.appendChild(berryBtn); 

    //Events that occur when the 'pick berries' button is clicked
    berryBtn.addEventListener('click', function() {
      //collect random number of berries between 1 and 10
      var berryCount = Math.floor(Math.random()* (10) + 1);
      userStatus.berries += berryCount;
      //Update the DOM with each click
      updateUserStatus();
      //display 'you picked {X} berries' every time the 'pick berries' button is clicked
      var berriesText = document.createElement('div');
      berriesText.innerHTML = 'you picked ' + berryCount + ' berries';
      document.getElementById('left').appendChild(berriesText);
      //remove 'pick berries' button
      document.getElementById("buttons").removeChild(berryBtn);
    });
  }
});

//Update DOM on page load
updateUserStatus();

})();
