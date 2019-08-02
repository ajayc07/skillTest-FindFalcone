export interface Planet {

    value : string;
    name : string;
    distance : number;
    selected? : boolean;
    color? : string;
}

export interface Vehicle {

    value : string;
    name : string;
    total_no : number;
    max_distance : number;
    speed : number;
}

export interface Journey {

    selectedPlanet? : Planet;
    selectedVehicle? : Vehicle;
    
}
