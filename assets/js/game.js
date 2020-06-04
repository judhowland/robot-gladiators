// Game States
//"WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less
// "REPLAY" 
// "SHOP"

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ['Roborto', 'Amy Android', 'Robo Trumble'];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyNames) {
    // repeat and execute as long as the eneby robot is alive
    while(enemyHealth > 0 && playerHealth > 0) {

        // Alert users that they are starting the round
        // (Not needed) window.alert("Welcome to Robot Gladiators!");

        // Check if player wants to fight
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?");

            // if player choses to skip
            if (promptFight === "skip" || promptFight === "SKIP") {
                window.alert(playerName + " has chosen to skip the fight!");
            // confirm user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                //subtract money from playerMoney for skipping
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
                break;
            }
        }
               //remove enemy's health by subtracting the amount set in the playerAttack variable
            enemyHealth = Math.max(0, enemyHealth - playerAttack);
            console.log(playerName + " attacked " + enemyNames + ". " + enemyNames + " now has " + enemyHealth + " health remaining.");

                // check enemy's health
            if (enemyHealth <=0) {
                window.alert(enemyNames + " has died!");
                
                // award player money for winning
                playerMoney = playerMoney + 20;

                // leave while loop since enemy is dead
                break;
            }
            else {
            window.alert(enemyNames + " still has " + enemyHealth + " health left.");
            }

            // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
            var damage = randomNumber(enemyAttack - 3, enemyAttack);
            playerHealth = Math.max(0, playerHealth - damage);  

            // Log a resulting message to the console so we know that it worked.
            console.log(enemyNames + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

            // check player's health
            if (playerHealth <=0) {
                window.alert(playerName + " has died!");
                // leave while() loop if player is dead
                break;
            }
            else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        }
    };

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
}


// function to start a new game
var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i = 0; i < enemyNames.length; i++) {
    // let the user know which round they are in (NOTE: arrays start at 0)
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            // pick a new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];
            // reset enemy health to 50
            enemyHealth = randomNumber(40, 60);
            // call fight function with enemy robot
            fight(pickedEnemyName);
    
            // if player is still alive and we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                //ask if user wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm) {
                shop();
                }
            }  
        }   

    }    
        // after the loop ends, player is either out of health or enemies to fight (run endGame function) 
    endGame();

};


//function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
    // if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    }
    else {
        window.alert("You have lost your robot in battle! Game Over!"); 
    }
    // ask player if they want to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

// function to enter the shop
var shop = function() {
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                // increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }    
            else {
                window.alert("You don't have enough money!");
            }
            break;
        
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }    
            else {
                window.alert("You don't have enough money!");
            }
            break;

        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");

            // do nothing, so function will end:
            break;

        default: 
            window.alert("You did not pick a valid option. Try again.");
            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// start the game when the page loads
startGame();