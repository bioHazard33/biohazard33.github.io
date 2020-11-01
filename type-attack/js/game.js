const Game = (function () {
    let gameInstance;
    let sceneInstance;

    this.config = {
        type: Phaser.AUTO,
        width: 500,
        parent: "parent",
        height: "100vh",
        physics: {
            default: "arcade",
        },
        dom: {
            createContainer: true,
        },
        scale: {
            mode: Phaser.Scale.FIT,
        },
        scene: {
            preload,
            create,
            update,
        },
        backgroundColor: "#eeeeee",
    };

    function setSceneInstance(sceneObject) {
        sceneInstance = sceneObject;
    }

    function getSceneInstance() {
        return sceneInstance;
    }

    function rotateObject(object, initialAngle, finalAngle, duration, repeat = 0) {
        let rotateObj = sceneInstance.tweens.add({
            targets: object,
            angle: { from: initialAngle, to: finalAngle },
            ease: "Linear",
            duration,
            repeat,
            yoyo: false,
        });
    }

    function growObject(x, y, radius, duration, color = 0x5c50e3, thickness = 4, alpha = 1) {
        let graphics = sceneInstance.add.graphics();
        graphics.lineStyle(thickness, color, alpha);

        sceneInstance.tweens.addCounter({
            from: 0,
            to: radius,
            duration,
            yoyo: false,
            onUpdate: function (tween) {
                let ctr = tween.getValue();

                graphics.clear();

                graphics.lineStyle(thickness, color, alpha - ctr / radius);
                graphics.strokeCircle(x, y, ctr);
            },
        });
    }

    function shrinkObject(x,y,radius,duration,color = 0x5c50e3, thickness = 4, alpha = 0){
        let graphics = sceneInstance.add.graphics();
        graphics.lineStyle(thickness, color, alpha);

        sceneInstance.tweens.addCounter({
            from: radius,
            to: 0,
            duration,
            yoyo: false,
            onUpdate: function (tween) {
                let ctr = tween.getValue();

                graphics.clear();

                graphics.lineStyle(thickness, color, alpha + ctr / radius);
                graphics.strokeCircle(x, y, ctr);
            },
        });
    }

    function getGameInstance(height = "100vh", width = 500) {
        if (!gameInstance) {
            config.height = height;
            config.width = width;
            gameInstance = new Phaser.Game(config);
        }
        return gameInstance;
    }

    return { getGameInstance, setSceneInstance, getSceneInstance, rotateObject, growObject,shrinkObject };
})();

const Words = (function () {
    let difficulty = localStorage.getItem("difficulty");
    if (!difficulty || difficulty === "medium") {
        this.words = medium;
    } else if (difficulty === "easy") {
        this.words = easy;
    } else {
        this.words = hard;
    }

    this.length = words.length;
    this.isNewWord = false;
    this.currWords = [];

    function getRandomWord() {
        let ramdomIndex = Math.floor(Math.random() * length);
        let randomWord = words[ramdomIndex].toLowerCase();

        currWords.push(randomWord);
        isNewWord = true;

        return randomWord;
    }

    function getNewWordStatus() {
        return isNewWord;
    }

    function setNewWordStatus(status) {
        isNewWord = status;
    }

    function removeWord(word) {
        currWords = currWords.filter((ele) => ele !== word);
    }

    function getLatestWord() {
        return currWords[currWords.length - 1];
    }

    return { getRandomWord, getNewWordStatus, setNewWordStatus, getLatestWord, removeWord };
})();

const Ship = (function () {
    this.ship;
    this.lives;
    this.score;
    this.currAngle = 0;
    this.shield=null;

    function getInstance() {
        if (!ship) {
            return "Not yet created";
        }
        return ship;
    }

    function setInstance(shipObject) {
        ship = shipObject;
        ship.setOrigin(0.5, 0.5);
    }

    function getLives() {
        return lives.text;
    }

    function setLives(livesSprite) {
        lives = livesSprite;
    }

    function decrementLives() {
        let currLives = parseInt(lives.text);
        currLives--;
        lives.text = currLives;

        if (currLives == 0) {
            let gameover = Game.getSceneInstance().sound.add("gameover");
            gameover.play();

            alert("Game Over, Try again next time.");
            localStorage.setItem("highScore", Math.max(parseInt(score.text), localStorage.getItem("highScore")
                        ? parseInt(localStorage.getItem("highScore"))
                        : 0
            ));
            window.location.reload();
            window.location.href = "/type-attack/";
        }
    }

    function getScore() {
        return score.text;
    }

    function setScore(scoreSprite) {
        score = scoreSprite;
    }

    function incrementScore() {
        score.text = parseInt(score.text) + 10;
        if(parseInt(score.text) % 100 === 0){
            activateShields();
        }
    }

    function addShieldCollider(asteroidGroup){
        let sceneInstance=Game.getSceneInstance()
        if(shield)
            sceneInstance.physics.add.collider(asteroidGroup, shield, (a, b) => {
                let impact = sceneInstance.sound.add("impact_sound_big");
                impact.play();
                Asteroid.destroyAsteroidByGroup(asteroidGroup);
        });
    }

    function activateShields(duration=20000){
        Game.growObject(ship.x,ship.y,300,3000);
        let sceneInstance=Game.getSceneInstance();

        let shield_up=sceneInstance.sound.add('shield_up')
        shield_up.play()

        setTimeout(()=>{
            shield = sceneInstance.add.image(ship.x,ship.y,'barrier');
            shield.displayHeight=300;
            shield.displayWidth=300;

            sceneInstance.physics.world.enable(shield);
            shield.body.setImmovable(true)

            let asteroidGroups=Asteroid.getAsteroidGroups();
            asteroidGroups.forEach((asteroidGroup)=>{
                addShieldCollider(asteroidGroup['asteroidGroup'])
            })

            Game.rotateObject(shield,0,360,150,-1);
            deactivateShields(duration)

        },1500)
    }

    function deactivateShields(duration){
        setTimeout(()=>{
            let shield_down=Game.getSceneInstance().sound.add('shield_down')
            shield_down.play()
            
            Game.shrinkObject(ship.x,ship.y,300,3000);
            setTimeout(()=>{
                shield.destroy()
            },3000)
        },duration)
    }

    function fireWeapon(asteroidGroup) {
        let asteroid = asteroidGroup.getChildren()[0];
        let asteroid_text = asteroidGroup.getChildren()[1];

        let sceneInstance = Game.getSceneInstance();
        let laser = sceneInstance.add.image(Ship.getInstance().x, Ship.getInstance().y, "beam");

        let laser_sound = sceneInstance.sound.add("beam_sound");
        laser_sound.play();

        laser.displayWidth = 20;
        laser.displayHeight = 80;

        let shipRotation =
            Phaser.Math.RadToDeg(
                Phaser.Math.Angle.Between(asteroid.x, asteroid.y, ship.x, ship.y)
            ) - 90;
        let laserRotation =
            Phaser.Math.RadToDeg(
                Phaser.Math.Angle.Between(asteroid.x, asteroid.y, laser.x, laser.y)
            ) - 90;

        Game.rotateObject(ship, currAngle, shipRotation, 200);
        Game.rotateObject(laser, 0, laserRotation, 0);
        currAngle = shipRotation;

        sceneInstance.physics.world.enable(laser);
        sceneInstance.physics.add.collider(laser, asteroidGroup, (a, b) => {
            asteroid_text.text = asteroid_text.text.slice(1);

            if (asteroid_text.text.length == 0) {
                Asteroid.destroyAsteroidByGroup(asteroidGroup);
                incrementScore();
                let impact = sceneInstance.sound.add("impact_sound_big");
                impact.play();
            } else {
                let impact = sceneInstance.sound.add("impact_sound_small");
                impact.play();
            }
            laser.destroy();
        });

        sceneInstance.physics.moveToObject(laser, asteroidGroup.getChildren()[0], 500);
    }

    return {
        getInstance,setInstance,
        getLives,decrementLives,setLives,
        getScore,incrementScore,setScore,
        fireWeapon,
        addShieldCollider
    };
})();

const Asteroid = (function () {
    this.asteroidGroups = [];

    function addAsteroid(asteroidGroup) {
        asteroidGroups.push(asteroidGroup);
    }

    function destroyAsteroidByIndex(asteroidIndex) {
        asteroidGroups[asteroidIndex].clear(true, true);
        asteroidGroups.splice(asteroidIndex, 1);

        Ship.incrementScore();
    }

    function destroyAsteroidByGroup(asteroidGroup) {
        asteroidGroups = asteroidGroups.filter((ele) => ele["asteroidGroup"] !== asteroidGroup);
        let x = asteroidGroup.getChildren()[0].x;
        let y = asteroidGroup.getChildren()[0].y;

        createExplosion(x, y);

        asteroidGroup.clear(true, true);
    }

    function registerCharacter(character) {
        for (let asteroid in asteroidGroups) {
            let asteroid_text = asteroidGroups[asteroid]["text"];

            if (asteroid_text.charAt(0) === character) {
                asteroidGroups[asteroid]["text"] = asteroid_text.slice(1);
                Ship.fireWeapon(asteroidGroups[asteroid]["asteroidGroup"]);
                return;
            }
        }
        let error = Game.getSceneInstance().sound.add("error");
        error.play();
    }

    function createExplosion(x, y, radius = 50) {
        Game.growObject(x, y, radius, 300);
    }

    function getAsteroidGroups(){
        return asteroidGroups;
    }

    return { addAsteroid, registerCharacter, destroyAsteroidByGroup, destroyAsteroidByIndex, getAsteroidGroups };
})();

function preload() {
    Game.setSceneInstance(this);

    this.load.svg("ship", "./assets/images/spaceship.svg", { height: 50, width: 50 });
    this.load.svg("asteroid", "./assets/images/asteroid.svg", { height: 35, width: 35 });
    this.load.svg("lives", "./assets/images/heart.svg", { height: 25, width: 25 });
    this.load.svg("highscore", "./assets/images/highscore.svg", { height: 25, width: 25 });
    this.load.svg("score", "./assets/images/score.svg", { height: 25, width: 25 });
    this.load.image("beam", "./assets/images/beam.png");
    this.load.image("barrier", "./assets/images/barrier.png");

    this.load.audio("beam_sound", "./assets/sounds/laser.mp3");
    this.load.audio("impact_sound_big", "./assets/sounds/impact1.mp3");
    this.load.audio("impact_sound_small", "./assets/sounds/impact2.mp3");
    this.load.audio("error", "./assets/sounds/error.mp3");
    this.load.audio("gameover", "./assets/sounds/gameover.wav");
    this.load.audio("shield_up", "./assets/sounds/shield_up.mp3");
    this.load.audio("shield_down", "./assets/sounds/shield_down.mp3");

    this.load.video("bg", "./assets/videos/bg3.mp4", "loadeddata", false, true);
    }

function create() {
    let bg = this.add.video(300, 300, "bg");
    bg.play(true);

    const shipObject = this.add.image(
        this.game.canvas.width / 2,
        this.game.canvas.height - 70,
        "ship"
    );

    const lives = this.add.image(this.game.canvas.width - 60, 30, "lives");
    const highScore = this.add.image(
        this.game.canvas.width - 30,
        this.game.canvas.height - 30,
        "highscore"
    );
    const score = this.add.image(30, 30, "score");

    let lives_text = this.make.text({
        x: this.game.canvas.width - 35,
        y: 20,
        text: localStorage.getItem("zen") === "true" ? 999 : 3,
        style: {
            fontFamily: "Century Gothic",
            fontSize: "16px",
            align: "center",
            color: "#ffffff",
        },
    });

    let highScore_text = this.make.text({
        x: this.game.canvas.width - 110,
        y: this.game.canvas.height - 40,
        text: localStorage.getItem("highScore")
            ? localStorage.getItem("highScore").padStart(6, "0")
            : "000000",
        style: {
            fontFamily: "Century Gothic",
            fontSize: "18px",
            align: "center",
            color: "#ffffff",
        },
    });

    let score_text = this.make.text({
        x: 60,
        y: 20,
        text: 0,
        style: {
            fontFamily: "Century Gothic",
            fontSize: "18px",
            align: "center",
            color: "#ffffff",
        },
    });

    this.physics.world.enable(shipObject);
    shipObject.body.setImmovable(true);

    Ship.setInstance(shipObject);
    Ship.setLives(lives_text);
    Ship.setScore(score_text);
}

function update() {
    if (Words.getNewWordStatus() === true) {
        let randomPositionX = Math.floor(Math.random() * this.game.canvas.width);
        let asteroid = this.add.image(randomPositionX, -20, "asteroid");

        let asteroid_text = this.make.text({
            x: randomPositionX,
            y: 0,
            padding: {
                left: 5,
                right: 5,
                top: 2.5,
                bottom: 2.5,
            },
            text: Words.getLatestWord(),
            style: {
                fontFamily: "Century Gothic",
                fontSize: "16px",
                align: "center",
                color: "#ffffff",
                backgroundColor: "#000000",
            },
        });

        const asteroidGroup = this.add.group();
        const shipInstance = Ship.getInstance();

        asteroidGroup.addMultiple([asteroid, asteroid_text]);

        this.physics.world.enable(asteroidGroup);

        asteroid.body.setImmovable(true);
        asteroid_text.body.setImmovable(true);

        this.physics.moveToObject(asteroid_text, shipInstance, 100);
        this.physics.moveToObject(asteroid, shipInstance, 100);

        this.physics.add.collider(asteroidGroup, shipInstance, (a, b) => {
            let impact = this.sound.add("impact_sound_big");
            impact.play();
            Asteroid.destroyAsteroidByGroup(asteroidGroup);
            Ship.decrementLives();
        });

        Ship.addShieldCollider(asteroidGroup)
        Asteroid.addAsteroid({ asteroidGroup, text: asteroid_text.text });
        Words.setNewWordStatus(false);
    }
}

window.onload = () => {
    let screenHeight = window.innerHeight;
    let screenWidth = window.innerWidth;
    let canvasHeight;
    let canvasWidth;

    if (screenWidth <= 768) {
        canvasHeight = "100%";
        canvasWidth = "100vw";
    } else {
        canvasHeight = "100vh";
        canvasWidth = 500;
    }

    let audio = document.getElementById("bgAudio");
    audio.volume = 0.3;

    setInterval(Words.getRandomWord, 3000);
    const game = Game.getGameInstance(canvasHeight, canvasWidth);

    window.onkeypress = (event) => {
        if (event.charCode >= 97 && event.charCode <= 122) {
            Asteroid.registerCharacter(event.key);
        } else if (event.charCode >= 65 && event.charCode <= 90) {
            Asteroid.registerCharacter(event.key.toLowerCase());
        }
    };

    let keyboard_btns_ele = document.querySelectorAll(".keyboard-btn");
    keyboard_btns_ele.forEach((ele) => {
        ele.addEventListener("click", () => {
            
            let e = new KeyboardEvent("keypress", {
                char: ele.innerHTML,
                key: ele.innerHTML,
                charCode: ele.innerHTML.charCodeAt(0),
            });
            window.dispatchEvent(e);

        });
    });
};
