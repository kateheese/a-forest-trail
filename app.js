(function() {
  var userStatus = {
    energy: 100,
    steps: 0,
    berries: 0,
    water: 0
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
  //decrease engery by 10 with each step
  var energyCount = Math.floor(Math.random()* 10 + 1);
  userStatus.energy -= energyCount;
  //Update the DOM with each click
  updateUserStatus();
  //display'you continue down the trail' to the left after each click
  var walkingText = document.createElement('div');
  walkingText.innerHTML = 'you continue down the trail';
  document.getElementById('left').appendChild(walkingText);

  //get buttons div
    var buttonsDiv = document.getElementById('buttons');

  //Prompt user to pick berries every 10 steps
  if(userStatus.steps % 10 === 0) {    
    //create 'pick berries' button
    var berryBtn = document.createElement('button');
    berryBtn.id = 'pick-berries'
    berryBtn.innerHTML = 'pick berries';
    //add 'pick berries' button to buttons div
    buttonsDiv.appendChild(berryBtn); 

    //Events that occur when the 'pick berries' button is clicked
    berryBtn.addEventListener('click', function() {
      //collect random number of berries between 1 and 10
      var berryCount = Math.floor(Math.random()* 10 + 1);
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

  //Prompt user to look for water every 20 steps
  if(userStatus.steps % 20 === 0) {
    //create 'look for water' button
    var waterBtn = document.createElement('button');
    waterBtn.id = 'water'
    waterBtn.innerHTML = 'look for water';
    //add 'look for water' button to buttons div
    buttonsDiv.appendChild(waterBtn);

    //Events that occur when the 'look for water' button is clicked
    waterBtn.addEventListener('click', function() {
      //50% chance of finding water
      var waterCount = Math.floor(Math.random()* 2 + 1);
      var waterText = document.createElement('div');
      if (waterCount === 1) {
        //display 'you found water'
        waterText.innerHTML = 'you found water';
        document.getElementById('left').appendChild(waterText);
        //increase water by 1 when water is found
        userStatus.water += 1;
        //Update the DOM with each click
        updateUserStatus();
      } else {
        //display 'you could not find water'
        waterText.innerHTML = 'you could not find any water';
        document.getElementById('left').appendChild(waterText);
      }
      //remove 'look for water' button
      document.getElementById("buttons").removeChild(waterBtn);
    });
  }

});

//Update DOM on page load
updateUserStatus();

})();
