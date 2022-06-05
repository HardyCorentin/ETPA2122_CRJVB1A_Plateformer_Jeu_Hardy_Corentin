class world1 extends Phaser.Scene {
    constructor() {
        super("world1");
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
        this.load.image("tiles","../assets/Tiles.png");

        this.load.image("Rifts","../assets/Rift_World1.png");

        this.load.image("arrow","../assets/arrow.png")
        
        this.load.tilemapTiledJSON('map1', '../LD/Proto_scene1_resize.json');
        
        this.load.spritesheet('assassin','../assets/Assassin.png',
        { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("hero","../assets/hero.png",
        { frameWidth: 64, frameHeight: 64 });
       
        "hero","../assets/hero.png"
        this.load.spritesheet('guard','../assets/guard.png',
        { frameWidth: 64, frameHeight: 64 });}
        create() {
            this.hp=this.healthpoint;
            this.chrono = 100
            
            const levelmap = this.add.tilemap("map1");
            const tileset = levelmap.addTilesetImage(
                "Tiles",    
                "tiles",
            );
            const rifts = levelmap.addTilesetImage(
                "Rift_world1",
                "Rifts",
            )
            this.background  = levelmap.createLayer(
                "background",
                tileset,
            );
            this.background2  = levelmap.createLayer(
                "background2",
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
            
            this.player = this.physics.add.sprite(this.coordPlayerX,this.coordPlayerY,"hero",0);
            this.player.setVelocityX(this.playervelocityx);
            this.player.setVelocityY(this.playervelocityy);

                this.player.speedY = 0
                this.player.speedX = 0
                this.player.setVelocityX(this.playervelocityx);
                console.log(this.playervelocityx)
                this.player.setVelocityY(this.playervelocityy);
                this.player.body.setMaxSpeed(999);
            //Création des ennemis et de leurs animations
            this.arrow1 = this.physics.add.sprite(18272,3208,"arrow");
            this.arrow2 = this.physics.add.sprite(17248,3552,"arrow");
            this.arrow3 = this.physics.add.sprite(18393,3016,"arrow");
            this.arrow4 = this.physics.add.sprite(18393,2784,"arrow");
            this.arrow5 = this.physics.add.sprite(17248,2428,"arrow");
            this.assassin=this.physics.add.sprite(this.coordassassinX,this.coordassassinY,"assassin",0)
            this.guard1 = this.physics.add.sprite( this.coordguard1X,this.coordguard1Y,"guard",8);
            this.guard2 = this.physics.add.sprite( this.coordguard2X,this.coordguard2Y,"guard",8);
            
            this.anims.create({
                key:"maincharacteridle",
                frames:this.anims.generateFrameNumbers("hero",{start:0,end:3}),
                frameRate: 10,
                repeat:-1
            })
            
            this.anims.create({
                key : "guardangryleft",
                frames: this.anims.generateFrameNumbers("guard",{start:9,end:12}),
                frameRate: 10,
                repeat: -1
            })
            this.anims.create({
                key : "guardrushleft",
                frames: this.anims.generateFrameNumbers("guard",{start:14,end:15}),
                frameRate: 10,
                repeat: -1
            })
            this.anims.create({
                key : "guardrushright",
                frames: this.anims.generateFrameNumbers("guard",{start:6,end:7}),
                frameRate: 10,
                repeat: -1
            })
            this.anims.create({
                key : "guardstandingleft",
                frames: this.anims.generateFrameNumbers("guard",{start:8,end:8}),
                frameRate: 10,
                repeat: -1
            })
            this.anims.create({
                key : "guardstandingright",
                frames: this.anims.generateFrameNumbers("guard",{start:0,end:0}),
                frameRate: 10,
                repeat: -1
            })
            this.anims.create({
                key : "guardangryright",
                frames: this.anims.generateFrameNumbers("guard",{start:1,end:5}),
                frameRate: 10,
                repeat: -1
            })
            this.anims.create({
                key : "assassin camo",
                frames: this.anims.generateFrameNumbers("assassin",{start:0,end:4}),
            })

            this.guard1rage = false
            this.guard2rage = false
            this.guard1death = false
                
            //Préparation de la caméra
            this.cameras.main.zoom = 0.75;
                 this.cameras.main.startFollow(this.player);
                 this.physics.world.setBounds(0, 0, 1000, 0);
                
                

            this.cursors = this.input.keyboard.createCursorKeys();
            this.death = false  
            this.ground.setCollisionByProperty({collider:true});
            this.physics.add.collider(this.player,this.ground);
            this.physics.add.collider(this.guard1,this.ground);
            this.physics.add.collider(this.guard1,this.player, this.PerdHP, null, this);
            this.physics.add.collider(this.guard2,this.player, this.PerdHP, null, this);
            this.physics.add.collider(this.guard2,this.ground);
            this.physics.add.collider(this.arrow1,this.player, this.PerdHP, null, this);
            this.physics.add.collider(this.arrow1,this.ground);
            this.physics.add.collider(this.arrow2,this.player, this.PerdHP, null, this);
            this.physics.add.collider(this.arrow2,this.ground);
            this.physics.add.collider(this.arrow3,this.player, this.PerdHP, null, this);
            this.physics.add.collider(this.arrow3,this.ground);
            this.physics.add.collider(this.arrow4,this.player, this.PerdHP, null, this);
            this.physics.add.collider(this.arrow4,this.ground);
            this.physics.add.collider(this.arrow5,this.player, this.PerdHP, null, this);
            this.physics.add.collider(this.arrow5,this.ground);
            this.physics.add.collider(this.assassin,this.ground);
            this.physics.add.collider(this.assassin,this.player, this.PerdHP, null, this);

        }
        PerdHP(){
            this.hp -= 1
        }


        update() {
            console.log(this.player.y)
            
            console.log(this.player.x)
            //comportement des guardes
            if(this.player.x>= this.guard1.x-700  && this.player.x <= this.guard1.x-300 && this.player.y == 5344){
                this.guard1.setVelocityX(0)
                this.guard1.anims.play("guardangryleft",true)
            }
            else if(this.player.x>=11940 && this.player.y == 5344){
                this.guard1rage = true
                
            }
            
            if(this.player.x>=this.guard1.x &&this.guard1rage == true){
                 this.guard1.setVelocityX(500)
                 this.guard1.anims.play("guardrushright",true)
            }
            else if(this.player.x<=this.guard1.x && this.guard1rage == true){
                this.guard1.setVelocityX(-500)
                this.guard1.anims.play("guardrushleft",true)
            }

            if(this.player.x>= this.guard2.x-700  && this.player.x <= this.guard2.x-300 && this.player.y == 5344){
                this.guard2.setVelocityX(0)
                this.guard2.anims.play("guardangryleft",true)
            }
            else if(this.player.x>=this.guard2.x-299 && this.player.y == 5344){
                this.guard2rage = true
                
            }
            
            if(this.player.x>=this.guard2.x &&this.guard2rage == true){
                 this.guard2.setVelocityX(500)
                 this.guard2.anims.play("guardrushright",true)
            }
            else if(this.player.x<=this.guard2.x && this.guard2rage == true){
                this.guard2.setVelocityX(-500)
                this.guard2.anims.play("guardrushleft",true)
            }
            
            //fin du comportement des gardes.
            
            if (this.cursors.up.isDown && this.player.body.onFloor()){ //si la touche gauche est appuyée
                this.player.setVelocityY(-700); //alors vitesse négative en Y
                this.player.anims.play('maincharacteridle', true); //et animation => haut
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
                this.player.speedX = -700;
            }
            
            else if (this.cursors.left.isUp && this.cursors.right.isUp){
                this.player.setVelocityX(0);
                this.player.anims.play('maincharacteridle', true);
                this.player.speedX=0;
                
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
                this.player.setVelocityX(-700);
                this.player.anims.play('left', true); //et animation => haut
                console.log(this.player.VelocityY);
                this.player.speedY = -700;
                this.player.speedX = 700;
            }
            if (this.cursors.up.isUp && this.player.body.onFloor()){
                this.player.speedY = 0;
                
            }
            this.arrow1.setVelocityX(-500)
            if(this.arrow1.x <=17178){
                this.arrow1.x = 18272;
            }
            this.arrow2.setVelocityX(500)
            if(this.arrow2.x >=18272){
                this.arrow2.x = 17178;
            }
            this.arrow3.setVelocityX(500)
            if(this.arrow3.x >=18272){
                this.arrow3.x = 17178;
            }
            this.arrow4.setVelocityX(-500)
            if(this.arrow4.x <=17178){
                this.arrow4.x = 18272;
            }
            this.arrow5.setVelocityX(500)
            if(this.arrow5.x >=18272){
                this.arrow5.x = 17178;
            }
            if(this.player.y >= 6400){
                this.scene.start("gameOver")
            }
            if(this.hp <= 0){
                this.scene.start("gameOver")
            }
            
            if(this.player.x<=this.assassin.x+600 && this.player.y == 480){
                this.assassin.anims.play("assassin camo",true)
                this.assassincamo = true
                
            }
            
            if(this.player.x>=this.assassin.x &&this.assassincamo == true){
                 this.assassin.setVelocityX(900)
            }
            else if(this.player.x<=this.assassin.x && this.assassin == true){
                this.assassin.setVelocityX(-900)

            }

            if(this.assassin.y >= 2428){
                this.scene.start("victoire")
            }
            
            if(this.cursors.space.isDown){
            this.scene.start("world2",{
                hp: this.hp,   
                coordPlayerX: this.player.x,
                coordPlayerY:this.player.y,
                playervelocityx : this.player.speedX,
                playervelocityy : this.player.speedY,
                coordguard1X : this.guard1.x,
                coordguard2X : this.guard2.x,
                coordguard1Y : this.guard1.y,
                coordguard2Y : this.guard2.y,
                coordassassinX : this.assassin.x,
                coordassassinY : this.assassin.y,
                assassincamo: this.assassincamo,
            })}
            

        }
}