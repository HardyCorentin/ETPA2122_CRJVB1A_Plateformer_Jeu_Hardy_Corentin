class controlsandtools extends Phaser.Scene {
    constructor() {
        super('controlsandtools');
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

    preload(){
        this.load.image('controlsandtools', '../assets/controlsandtools.png');

    }

    create(){
        
        this.add.image(640, 360, 'controlsandtools');

        
        

    this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(){

        if (this.cursors.space.isDown){
            this.scene.start("world1",{
                hp:4,   
                coordPlayerX: 100,
                coordPlayerY:5100,
                playervelocityx : 0,
                playervelocityy : 0,
                coordguard1X: 12356,
                coordguard1Y: 5300,
                coordguard2X: 15199,
                coordguard2Y: 5300,
                coordassassinX:12128,
                coordassassinY:478,
                assassincamo: false,
                
            })
        };

    }
}