// Game States
//"WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less
// "REPLAY" 
//    * Allow player to choose if they want to replay
// "SHOP"
//    * Allow player to choose if they want to enter shop after a round

var fight = function(enemy) {   // getting the content pass in the call (then is getting an object (name, attack, health))
    console.log(enemy);
    console.log(playerInfo);
    // repeat and execute as long as the eneby robot is alive
    while(enemy.health > 0 && playerInfo.health > 0) {

        // Alert users that they are starting the round
        // (Not needed) window.alert("Welcome to Robot Gladiators!");

        // Check if player wants to fight
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?");

            // if player choses to skip
            if (promptFight === "skip" || promptFight === "SKIP") {
                window.alert(playerInfo.name + " has chosen to skip the fight!");
            // confirm user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                //subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
        }
               //remove enemy's health by subtracting the amount set in the playerInfo.attack variable
            enemy.health = Math.max(0, enemy.health - playerInfo.attack);
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

                // check enemy's health
            if (enemy.health <=0) {
                window.alert(enemy.name + " has died!");
                
                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                // leave while loop since enemy is dead
                break;
            }
            else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }

            // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);  

            // Log a resulting message to the console so we know that it worked.
            console.log(enemy.names + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            // check player's health
            if (playerInfo.health <=0) {
                window.alert(playerInfo.name + " has died!");
                // leave while() loop if player is dead
                break;
            }
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
    };

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
}

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");           
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    },
];

// function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++) {
    // let the user know which round they are in (NOTE: arrays start at 0)
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            // pick a new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];   //name and attack
            // reset enemy health to random between 40 and 60
            pickedEnemyObj.health = randomNumber(40, 60);  // pickeenemyobd  (name, attack, health)
            // call fight function with enemy robot
         
            fight(pickedEnemyObj);  // here you pass content no variables names 
    
            // if player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
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
           playerInfo.refillHealth();
            break;
        
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
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