// Game States
//"WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
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
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }
            //remove enemy's health by subtracting the amount set in the playerAttack variable
            enemyHealth = enemyHealth - playerAttack;
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
            playerHealth = playerHealth - enemyAttack;  

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

for(var i = 0; i < enemyNames.length; i++) {
    // let the user know which round they are in (NOTE: arrays start at 0)
    if (playerHealth > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
    // pick a new enemy to fight based on the index of the enemyNames array
    var pickedEnemyName = enemyNames[i];
    // reset enemy health to 50
    enemyHealth = 50;
    // call fight function with enemy robot
    fight(pickedEnemyName);
    }
    else {
        window.alert("YOu have lost your robot in battle! Game Over!"); 
        break;
    }
}