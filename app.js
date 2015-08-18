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

  //get buttons div
  var buttonsDiv = document.getElementById('buttons');

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


    //Prompt user to pick berries every 10 steps
    if(userStatus.steps % 10 === 0) {    
      //create 'pick berries' button
      var berryBtn = document.createElement('button');
      berryBtn.id = 'pick-berries';
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

        if (buttonsDiv.contains(document.getElementById('eat-berries')) === false) {
          (function eatBerries() {
            var berryInt = setInterval(function() {
              //create 'eat berries' button
              var eatBerriesBtn = document.createElement('button');
              eatBerriesBtn.id = 'eat-berries'
              eatBerriesBtn.innerHTML = 'eat berries';
              //add 'eat berries' button to buttons div
              buttonsDiv.appendChild(eatBerriesBtn);

              //stop creating 'eat berries' button if button already exists
              if(buttonsDiv.contains(document.getElementById('eat-berries'))) {
                clearInterval(berryInt);
              } 

              eatBerriesBtn.addEventListener('click', function() {
                //On click of button decreases the berries count by 1, and increases energy by 2
                userStatus.berries -= 1;
                userStatus.energy += 2;
                //Update the DOM with each click
                updateUserStatus();
                //display 'you ate berries and gained energy' every time the 'eat berries' button is clicked
                var eatBerriesText = document.createElement('div');
                eatBerriesText.innerHTML = 'you ate berries and gained energy';
                document.getElementById('left').appendChild(eatBerriesText);
                //remove 'eat berries' button
                document.getElementById("buttons").removeChild(eatBerriesBtn);
                //If userStatus berries is greater than zero, call eat berries function
                if (userStatus.berries > 0) {
                  eatBerries();
                }
              })
            }, 10000);
          })();
        }
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

          if (buttonsDiv.contains(document.getElementById('drink-water')) === false) {
            (function drinkWater() {
              var waterInt = setInterval(function() {
                //create 'drink water' button
                var drinkWaterBtn = document.createElement('button');
                drinkWaterBtn.id = 'drink-water'
                drinkWaterBtn.innerHTML = 'drink water';
                //add 'drink water' button to buttons div
                buttonsDiv.appendChild(drinkWaterBtn);

                //stop creating 'drink water' button if button already exists
                if(buttonsDiv.contains(document.getElementById('drink-water'))) {
                  clearInterval(waterInt);
                } 

                drinkWaterBtn.addEventListener('click', function() {
                  //On click of button decreases the water count by 1, and increases energy by 10
                  userStatus.water -= 1;
                  userStatus.energy += 10;
                  //Update the DOM with each click
                  updateUserStatus();
                  //display 'you drank water and gained energy' every time the 'drink water' button is clicked
                  var drinkWaterText = document.createElement('div');
                  drinkWaterText.innerHTML = 'you drank water and gained energy';
                  document.getElementById('left').appendChild(drinkWaterText);
                  //remove 'drink water' button
                  document.getElementById("buttons").removeChild(drinkWaterBtn);
                  //If userStatus water is greater than zero, call drinkWater function
                  if (userStatus.water > 0) {
                    drinkWater();
                  }
                })
              }, 5000);
            })();
          }
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
