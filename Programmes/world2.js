class world2 extends Phaser.Scene {
    constructor() {
        super("world2");
    }
    init(data){
        this.healthpoint = data.hp;
        this.coordPlayerX=data.coordPlayerX;
        this.coordPlayerY=data.coordPlayerY;
        this.playervelocityx = data.playervelocityx;
        this.playervelocityy = data.playervelocityy;
        this.coordguard1X = data.coordguard1X;
        this.coordguard1Y = data.coordguard1Y;
        this.coordguard2X = data.coordguard2X;
        this.coordguard2Y = data.coordguard2Y;
        this.coordassassinX = data.coordassassinX;
        this.coordassassinY = data.coordassassinY;
        this.assassincamo = data.assassincamo;
    }
    preload() {
        this.load.image("tiles","assets/Tiles.png");

        this.load.image("Rift","../assets/Rift_World2.png");
        
        this.load.tilemapTiledJSON('map2', '../LD/Proto_scene2_resize.json');

        this.load.spritesheet("hero","../assets/hero_void.png",
        { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet("enemy","../assets/enemy.png",{frameWidth : 64, frameHeight : 64});
        this.load.spritesheet("assassin","../assets/Assassin.png",{frameWidth : 64, frameHeight : 64});

        /*this.load.spritesheet('hero','assets/hero.png',
    { frameWidth: 32, frameHeight: 32 });*/}
        create() {
            
            this.hp = this.healthpoint;
            this.guard1x = this.coordguard1X;
            console.log(this.guard1x)
            this.guard2x = this.coordguard2X;
            console.log(this.guard2x)
            this.guard1y = this.coordguard1Y;
            console.log(this.guard1y)
            this.guard2y = this.coordguard2Y;
            console.log(this.guard2y)
            const levelmap = this.add.tilemap("map2");
            const tileset = levelmap.addTilesetImage(
                "Tiles",    
                "tiles",
            );
            const rifts = levelmap.addTilesetImage(
                "Rift_world2",
                "Rift",
            )
            this.background  = levelmap.createLayer(
                "background",
                tileset,
            );
            this.ground  = levelmap.createLayer(
                "ground",
                tileset,
            );
            this.foreground  = levelmap.createLayer(
                "foreground",
                rifts,
                
            );
            //Apparition du joueur suivant les coordonnées, ansi que la constinuation de son mouvement.
            this.player = this.physics.add.sprite(this.coordPlayerX,this.coordPlayerY,"hero_void",0);
            this.player.speedX = 0;
            this.player.speedY = 0;

            this.player.setVelocityX(this.playervelocityx);
            console.log(this.playervelocityx)
            this.player.setVelocityY(this.playervelocityy);
            this.player.body.setMaxSpeed(999);
            //Fin de la section
            //Creation des monstres
            this.assassincamouflage = this.assassincamo
            
            this.monster = this.physics.add.sprite(1430,5408,"enemy",0);
            this.monster2= this.physics.add.sprite(5380,5408,"enemy",0);
            this.assassin= this.physics.add.sprite(this.coordassassinX,this.coordassassinY,"assassin",0);
            this.anims.create({
                key : "monster left",
                frames: this.anims.generateFrameNumbers("enemy",{start:0,end:2}),
                frameRate: 10,
                repeat: -1
            })
            this.anims.create({
                key : "monster right",
                frames: this.anims.generateFrameNumbers("enemy",{start:3,end:5}),
                frameRate: 10,
                repeat: -1
                
            }) 

            this.anims.create({
                key : "assassin camo",
                frames: this.anims.generateFrameNumbers("assassin",{start:0,end:4}),
            })
            this.anims.create({
                key:"maincharacteridlevoid",
                frames:this.anims.generateFrameNumbers("hero",{start:0,end:3}),
                frameRate: 10,
                repeat:-1
            })
            
            //Préparation de la caméra
            this.cameras.main.zoom = 0.75;
                 this.cameras.main.startFollow(this.player);
                 this.physics.world.setBounds(0, 0, 1000, 0);
            //Fin de la section
            this.monster.setVelocityX(-500);
            this.monster2.setVelocityX(500);
                
            //Controles et collisions
            this.cursors = this.input.keyboard.createCursorKeys();
                
            this.ground.setCollisionByProperty({collider:true});
            this.physics.add.collider(this.player,this.ground);
            this.physics.add.collider(this.monster,this.ground);
            this.physics.add.overlap(this.player,this.monster, this.PerdHP, null, this);
            this.physics.add.collider(this.player,this.monster2, this.PerdHP, null, this);
            this.physics.add.collider(this.monster2,this.ground);
            this.physics.add.collider(this.player,this.assassin, this.PerdHP, null, this);
            this.physics.add.collider(this.assassin,this.ground);
            this.timer = 0
        }

        PerdHP(){
            this.hp -= 1
        }

        update() {           
             //déplacement monstres
            console.log(this.hp);
            if(this.monster.x>=1499 ){
                this.monster.setVelocityX(-500)
                this.monster.anims.play("monster left",true)
            }
            else if(this.monster.x<=1120){
                this.monster.setVelocityX(500)
                this.monster.anims.play("monster right",true)
            }
            if(this.monster2.x<=5280){
                this.monster2.setVelocityX(500);
                this.monster2.anims.play("monster right",true)
            }
            else if(this.monster2.x>=6480){
                this.monster2.setVelocityX(-500);
                this.monster2.anims.play("monster left",true)
            }
            //fin déplacement monstres
            
            if (this.cursors.up.isDown && this.player.body.onFloor()){ //si la touche gauche est appuyée
                this.player.setVelocityY(-700); //alors vitesse négative en Y
                this.player.anims.play('left', true); //et animation => haut
                console.log(this.player.VelocityY);
                this.player.speedY = -700;
            }
            else if (this.cursors.left.isDown){ //si la touche gauche est appuyée
                this.player.setVelocityX(-700); //alors vitesse négative en X
                this.player.anims.play('left', true); //et animation => gauche
                this.player.speedX = -700;
            }
            else if (this.cursors.right.isDown){ //si la touche gauche est appuyée
                this.player.setVelocityX(700); //alors vitesse positive en X
                this.player.anims.play('left', true); //et animation => droite
                this.player.speedX = 700;
            }
            
            else if (this.cursors.left.isUp && this.cursors.right.isUp){
                this.anims.create({
                    key:"maincharacteridlevoid",
                    frames:this.anims.generateFrameNumbers("hero",{start:0,end:3}),
                    frameRate: 10,
                    repeat:-1
                })
                this.player.setVelocityX(0);
                this.player.speedX = 0;
            }

            else if (this.cursors.up.isDown && this.cursors.left.isDown && this.player.body.onFloor()){ //si la touche gauche est appuyée
                this.player.setVelocityY(-700); //alors vitesse négative en Y
                this.player.setVelocityX(-700);
                this.player.anims.play('left', true); //et animation => haut
                console.log(this.player.VelocityY);
                this.player.speedY = -700;
                this.player.speedX = -700;
            }

            else if (this.cursors.up.isDown && this.cursors.right.isDown && this.player.body.onFloor()){ //si la touche gauche est appuyée
                this.player.setVelocityY(-700); //alors vitesse négative en Y
                this.player.setVelocityX(700);
                this.player.anims.play('left', true); //et animation => haut
                console.log(this.player.VelocityY);
                this.player.speedY = -700;
                this.player.speedX = 700;
            }
            if (this.cursors.up.isUp && this.player.body.onFloor()){
                this.player.speedY = 0;
            }
            if(this.player.x<=this.assassin.x+600 && this.player.y == 480){
                this.assassin.anims.play("assassin camo",true)
                this.assassincamo = true
                
            }
            
            if(this.player.x>=this.assassin.x &&this.assassincamouflage == true){
                 this.assassin.setVelocityX(900)
            }
            else if(this.player.x<=this.assassin.x && this.assassincamouflage == true){
                this.assassin.setVelocityX(-900)

            }
            if(this.assassin.y >= 2428){
                this.scene.start("victoire")
            }
            if(this.player.y >= 6400){
                this.scene.start("gameOver")
            }
            if(this.hp <= 0){
                this.scene.start("gameOver");
            }
            if(this.cursors.space.isDown){
            this.scene.start("world1",{
                hp: this.hp,   
                coordPlayerX: this.player.x,
                coordPlayerY:this.player.y,
                playervelocityx : this.player.speedX,
                playervelocityy : this.player.speedY,
                coordguard1X : this.guard1x,
                coordguard2X : this.guard2x,
                coordguard1Y : this.guard1y,
                coordguard2Y : this.guard2y,
                coordassassinX : this.assassin.x,
                coordassassinY : this.assassin.y,
                assassincamo:this.assassincamouflage,
            })}
            

        }
}