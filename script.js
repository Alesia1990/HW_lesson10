const Microwave = function(brand, model){
    

    this.brand = brand;
    this.model = model;
    this.openDoor = false;

    this.status = false;
    this.prog = 0;// w -подогрев, df- разморозка
    this.sec = 0;


    this.open = function(){
        this.openDoor = true;
        if (this.status == true){
        this.off();
        };
    };


    this.programm = function(prog){
        if (prog == "w" || prog == "df"){
                this.prog = prog;
        };
    };

    this.time = function(sec){
        if (isNaN(sec) !== true && sec > 0){ // если ввести нечисло или -
            this.sec = sec;
        };
    };

    this.close = function(){
        this.openDoor = false;
    };

    this.on = function(){
        if(this.prog !== 0 &&  this.openDoor == false){
            this.status = true;
            let self = this;
            setTimeout(function(){
                self.off();
                alert("Работа завершена!");
            }, this.sec * 1000)
        };

    };


    this.off = function(){
        this.status = false;
        this.sec = 0;
        this.prog = 0;
    };


    this.info = function(){
        console.log(`${this.brand} ${this.molel}
        Open door: ${this.openDoor}
        Programm : ${this.prog}
        Time: ${this.sec}
        Status: ${this.status}`);
    }
}
const bosh = new Microwave("Bosh", "DEL582");

// давлениие воды* программа стирки* открываем дверь* загружаем белье* закрываем дверь* запускаем стирку*
let WashingMachine = function(brand, model, maxWeghtLinen){ 
    Microwave.apply(this, arguments);

    let waterPressure =0;

    maxWeghtLinen = maxWeghtLinen || 0;

    this.status = false;

    this.openDoor = false;

    let weightLinen = 0;

    let self = this;

    let sT = null;

    this.prog = 0;
    let parentProgramm = this.programm;
    let parentOff = this.off;

    this.openTape = function(){

        waterPressure = 4;
    };

    this.closeTape = function(){

        waterPressure = 0;
        clearTimeout(sT);
        this.off()
    };
    this.open = function(){

        this.openDoor = true;
    };

    this.addLinen = function(weight){// загрузка белья

        if(weight > 0 && weight<= 7 && this.openDoor) {
            weightLinen = weight;
        } else{
            weightLinen =0;
        };
    };

    this.programm = function(prog){// w- стирка df- полоскание pr- отжим

        parentProgramm.call(this);
        if(parentProgramm()== true || prog == "pr") this.prog = prog;
    };

    this.washing= function(){

        if(this.prog !=0 && !this.openDoor && waterPressure !=0 && weightLinen !=0){
            this.status = true;
            sT= setTimeout(function(){
                alert("Белье постирано!");
                self.off();
            }, 5000);
            
        };
    };
    this.off = function(){

        parentOff.call(this);
        clearTimeout(sT);
        this.openDoor = true;
        this.prog = 0;
    };


    this.info= function(){
        console.log(`Давление воды: ${waterPressure},
        Дверь открыта: ${this.openDoor},
        Загрузка белья: ${weightLinen} кг,
        Программа стирки: ${this.prog},
        Процесс стирки: ${this.status},
        `);
    };
};
let washingMachine = new WashingMachine("Samsung", "AA61", 7);
console.log(washingMachine);
washingMachine.info();
washingMachine.openTape();
washingMachine.open();
washingMachine.addLinen(5);
washingMachine.programm("pr");
washingMachine.close();
washingMachine.washing();
washingMachine.info();

