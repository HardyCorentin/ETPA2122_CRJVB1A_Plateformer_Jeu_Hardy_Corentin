class story3 extends Phaser.Scene {
    constructor() {
        super('story3');
    }

    preload(){
        this.load.image('story3', '../assets/story3.png');

    }

    create(){
        
        this.add.image(640, 360, 'story3');

        
        

    this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(){

        if (this.cursors.space.isDown){
            this.scene.start("victoire",{
            })
        };
        

    }
}