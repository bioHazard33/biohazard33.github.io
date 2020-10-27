const Game = (function () {
    let gameInstance;
    let sceneInstance;

    this.config = {
        type: Phaser.AUTO,
        width: 500,
        height: "100vh",
        physics: {
            default: "arcade",
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

    function rotateObject(object, initialAngle, finalAngle, duration) {
        let rotateObj = sceneInstance.tweens.add({
            targets: object,
            angle: { from: initialAngle, to: finalAngle },
            ease: "Linear",
            duration,
            repeat: 0,
            yoyo: false,
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

    return { getGameInstance, setSceneInstance, getSceneInstance, rotateObject };
})();

const Words = (function () {

    let difficulty=localStorage.getItem('difficulty')
    if(!difficulty || difficulty==="medium"){
        this.words=medium;
    }
    else if(difficulty==="easy"){
        this.words=easy;
    }
    else{
        this.words=hard;
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

    function getInstance() {
        if (!ship) {
            return "Not yet created";
        }
        return ship;
    }

    function setInstance(shipObject) {
        ship = shipObject;
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
            localStorage.setItem(
                "highScore",
                Math.max(
                    parseInt(score.text),
                    localStorage.getItem("highScore")
                        ? parseInt(localStorage.getItem("highScore"))
                        : 0
                )
            );
            window.location.href="/";
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
        getInstance,
        setInstance,
        getLives,
        decrementLives,
        setLives,
        getScore,
        incrementScore,
        setScore,
        fireWeapon,
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

    return { addAsteroid, registerCharacter, destroyAsteroidByGroup, destroyAsteroidByIndex };
})();

function preload() {
    Game.setSceneInstance(this);

    this.load.svg("ship", "./assets/images/spaceship.svg", { height: 50, width: 50 });
    this.load.svg("asteroid", "./assets/images/asteroid.svg", { height: 35, width: 35 });
    this.load.svg("lives", "./assets/images/heart.svg", { height: 25, width: 25 });
    this.load.svg("highscore", "./assets/images/highscore.svg", { height: 25, width: 25 });
    this.load.svg("score", "./assets/images/score.svg", { height: 25, width: 25 });
    this.load.image("beam", "./assets/images/beam.png");

    this.load.audio("beam_sound", "./assets/sounds/laser.mp3");
    this.load.audio("impact_sound_big", "./assets/sounds/impact1.mp3");
    this.load.audio("impact_sound_small", "./assets/sounds/impact2.mp3");
    this.load.audio("error", "./assets/sounds/error.mp3");
    this.load.audio("gameover", "./assets/sounds/gameover.wav");

    this.load.video("bg","./assets/videos/bg3.mp4",'loadeddata',false,true)
}

function create() {
    let bg=this.add.video(300,300,"bg")
    bg.play(true)

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
        text: localStorage.getItem('zen')==='true' ? 999 : 3,
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

        Asteroid.addAsteroid({ asteroidGroup, text: asteroid_text.text });
        Words.setNewWordStatus(false);
    }
}

window.onload = () => {
    setInterval(Words.getRandomWord, 4000);
    const game = Game.getGameInstance();

    window.onkeypress = (event) => {
        if (event.charCode >= 97 && event.charCode <= 122) {
            Asteroid.registerCharacter(event.key);
        } else if (event.charCode >= 65 && event.charCode <= 90) {
            Asteroid.registerCharacter(event.key.toLowerCase());
        }
    };
};
