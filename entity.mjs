export class Entity {

    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;

        this.ateBerry = true;
        this.body = buildBody(this, 3);
    }

     checkIfDead(size) {
        return this.doesOverlap() || this.isOutOfBounds(size);
    }

    doesOverlap() {
         for (let i = 0; i < this.body.length; i++) {
             for (let j = 0; j < this.body.length; j++) {
 
                 if (i != j) {
                     if (this.body[i].x == this.body[j].x &&
                         this.body[i].y == this.body[j].y) {
                         console.log('dead');
                         return true;
                     }
                 }
 
             }
         }
 
         return false;
     }

    isOutOfBounds(size) {
        return this.body[0].x < 0 || this.body[0].y < 0 ||
            this.body[0].x >= size || this.body[0].y >= size;
    }

    isEatingBerry(berry) {


        for (let i = 0; i < this.body.length; i++) {
            if (this.body[i].x == berry.x && this.body[i].y == berry.y) {
                return true;
            }

        }

        return false;
    }

    eat() {
        this.ateBerry = true;
    }

    setDirection(direction) {
        if(((direction + 2) % 4) == this.direction) {
           return;
        }
        this.direction = direction;
    }

    moveBody() {

        let moveX = 0;
        let moveY = 0;

        if (this.direction == 0) {
            moveX = 1;
        }
        else if (this.direction == 1) {
            moveY = 1;
        }
        else if (this.direction == 2) {
            moveX = -1;
        }
        else if (this.direction == 3) {
            moveY = -1;
        }

        let nBody = [];
        nBody[0] = {
            x: this.body[0].x + moveX,
            y: this.body[0].y + moveY
        }

        const length = this.ateBerry ? this.body.length : this.body.length - 1;
        this.ateBerry = false;
        for (let i = 0; i < length; i++) {
            nBody[i + 1] = {
                x: this.body[i].x,
                y: this.body[i].y
            }
        }

        this.body = nBody;
    }

}

function buildBody(entity, length) {
    let body = [];

    for (let i = 0; i < length; i++) {
        body[i] = {
            x: entity.x,
            y: entity.y - i
        }
    }

    return body;
}
