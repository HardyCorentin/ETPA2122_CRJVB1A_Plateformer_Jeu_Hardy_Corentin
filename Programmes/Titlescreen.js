class Titlescreen extends Phaser.Scene {
    constructor() {
        super('Titlescreen');
    }

    preload(){
        this.load.image('TitleScreen', '../assets/Titlescreen.png');

    }

    create(){
        
        this.add.image(640, 360, 'TitleScreen');

        
        

    this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(){

        if (this.cursors.space.isDown){
            this.scene.start("story1",{
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
                story2done : false, 
                
            })
        };
        if (this.cursors.shift.isDown){
            this.scene.start("controlsandtools",{
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
                story2done : false, 
                
            })
        };

    }
}