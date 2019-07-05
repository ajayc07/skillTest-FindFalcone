export interface Planet {

    value : string;
    name : string;
    distance : number;
    selected? : boolean;
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
    // timeTake : number;
    // vechileSpeed: number;
    // planetDistance : number;
    
}