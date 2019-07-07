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
    currentAvailablity : number;
    maxDistance : number;
    speed : number;
}

export interface Journey {

    selectedPlanet? : Planet;
    selectedVehicle? : Vehicle;
    
}