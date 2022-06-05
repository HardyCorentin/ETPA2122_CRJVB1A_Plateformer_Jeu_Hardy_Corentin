class victoire extends Phaser.Scene {
    constructor() {
        super("victoire");
    }
    
    preload() {
        this.load.image("victoryscreen","../assets/victoryscreen.png");
    }

        
        create() {
            this.add.image(640, 360, 'victoryscreen');
;
            this.cursors = this.input.keyboard.createCursorKeys();
            
        }
        


        update() {
            
            
            if(this.cursors.space.isDown){
            this.scene.start("Titlescreen",{
                
            })}
            

        }
}