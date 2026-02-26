document.querySelector("#end-btn").addEventListener("click", end_game);

let hp = 100;
let mp = 50;
let xp = 0;
let enemy_hp = 100;
let enemy_mp = 50;
let turn = 1;
let game_over = false;
let block = 0;

let hp_el = document.querySelector("#health");
let mp_el = document.querySelector("#mana");
let xp_el = document.querySelector("#experience");
let enemy_hp_el = document.querySelector("#enemy-health");
let enemy_mp_el = document.querySelector("#enemy-mana");

function update_ui(){
    hp_el.textContent = "HP: " + hp;
    mp_el.textContent = "MP: " + mp;
    xp_el.textContent = "XP: " + xp;
    enemy_hp_el.textContent = "Enemy HP: " + enemy_hp;
    enemy_mp_el.textContent = "Enemy MP: " + enemy_mp;
}

function log(msg){
    document.querySelector("#game-log").innerHTML += `<li>${msg}</li>`;
}

function turn_check(){
    if(!game_over && turn % 2 === 0) {
        enemy_turn();
    }
}

function attack(){
    if(game_over){
        return;
    }

    let random_damage = Math.floor(Math.random() * 15) + 20;
    enemy_hp -= random_damage;
    if(enemy_hp < 0){
        enemy_hp = 0;
    }
    enemy_hp_el.textContent = "Enemy HP: " + enemy_hp;
    log(`You attack the enemy for ${random_damage} damage!`);

    if(enemy_hp <= 0){
        log("You defeated the enemy!");
        xp += 50;
        xp_el.textContent = "XP: " + xp;
        new_enemy();
        turn++;
        return;
    }

    turn++;
    turn_check();
}

function defend(){
    if(game_over){
        return;
    }
    block = Math.floor(Math.random() * 10) + 10;
    log(`You defend and will block ${block} damage!`);
    turn++;
    turn_check();
}

function use_item(){
    if(game_over){
        return;
    }
    if(mp >= 10){
        mp -= 10;
        hp += 20;
        if (hp > 100) hp = 100;
        update_ui();
        log("You use a health potion and restore 20 HP!");
    }else{
        log("You don't have enough MP to use an item!");
    }
    turn++;
    turn_check();
}

function new_enemy(){
    enemy_hp = 100;
    enemy_mp = 50;
    update_ui();
    log("A new enemy appears!");
}

function game(){
    log("Welcome to the RPG Game! Click the buttons to play.");
    if(turn % 2 === 1){
        log("It's your turn! Choose an action.");
    }else{
        enemy_turn();
    }
}

function enemy_turn(){
    if(game_over){
        return;
    }
    if(enemy_hp <= 0){
        enemy_hp = 0;
        enemy_hp_el.textContent = "Enemy HP: " + enemy_hp;
        return;
    }

    if(enemy_hp <= 30 && enemy_mp >= 10){
        enemy_mp -= 10;
        enemy_hp += 20;
        if (enemy_hp > 100) enemy_hp = 100;

        enemy_hp_el.textContent = "Enemy HP: " + enemy_hp;
        enemy_mp_el.textContent = "Enemy MP: " + enemy_mp;
        log("The enemy uses a healing spell and restores 20 HP!");
    }else{
        let random_damage = Math.floor(Math.random() * 20) + 10;
        let effective_damage = random_damage - block;
        if(effective_damage < 0){
            effective_damage = 0;
        }
        if(block > 0){
            log(`You blocked ${block} damage!`);
        }

        block = 0;
        hp -= effective_damage;
        if (hp < 0) hp = 0;

        update_ui();
        log(`The enemy attacks you for ${random_damage} damage (you take ${effective_damage}).`);

        if(hp <= 0){
            log("You have been defeated by the enemy!");
            game_over = true;
            return;
        }
    }
    turn++;
    if(!game_over){
        log("It's your turn! Choose an action.");
    }
}

function end_game(){
    log("Game Over! Thanks for playing!");
    game_over = true;
}

update_ui();
game();