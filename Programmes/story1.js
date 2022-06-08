class story1 extends Phaser.Scene {
    constructor() {
        super('story1');
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
        this.story2done = data.story2done;
    }

    preload(){
        this.load.image('story1', '../assets/story1.png');

    }

    create(){
        
        this.add.image(640, 360, 'story1');
        this.healthpoint1 = this.healthpoint;
        this.coordPlayerX1 =this.coordPlayerX;
        this.coordPlayerY1 =this.coordPlayerY;
        this.playervelocityx1 =this.playervelocityx;
        this.playervelocityy1 = this.playervelocityy;
        this.coordguard1X1 = this.coordguard1X;
        this.coordguard1Y1 = this.coordguard1Y;
        this.coordguard2X1 = this.coordguard2X;
        this.coordguard2Y1 = this.coordguard2Y;
        this.coordassassinX1 = this.coordassassinX;
        this.coordassassinY1 = this.coordassassinY;
        this.assassincamo1 = this.assassincamo;
        this.story2done1 = this.story2done;


        

    this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(){

        if (this.cursors.space.isDown){
            this.scene.start("world1",{
                hp:this.healthpoint,   
                coordPlayerX: this.coordPlayerX1,
                coordPlayerY:this.coordPlayerY1,
                playervelocityx : this.playervelocityx1,
                playervelocityy : this.playervelocityy1,
                coordguard1X: this.coordguard1X1,
                coordguard1Y: this.coordguard1Y1,
                coordguard2X: this.coordguard2X1,
                coordguard2Y: this.coordguard2Y1,
                coordassassinX:this.coordassassinX1,
                coordassassinY:this.coordassassinY1,
                assassincamo: this.assassincamo1,
                story2done: this.story2done1,
                
            })
        };
        

    }
}