import { Observable } from 'rxjs';
import { Planet } from '../model/app-model';

export const MOCK_VECHILES = [
    {
      value : 'Space Pod',
      name : 'Space Pod',
      total_no : 2,
      max_distance : 200,
      speed : 2
    },
    {
      value : 'Space Rocket',
      name : 'Space Rocket',
      total_no : 1,
      max_distance : 300,
      speed : 3
    },
    {
      value : 'Space Shuttle',
      name : 'Space Shuttle',
      total_no : 1,
      max_distance :400,
      speed : 5
    },
    {
      value : 'Space Ship',
      name : 'Space Ship',
      total_no : 2,
      max_distance : 600,
      speed : 10
    }
  ];

  export const MOCK_PLANETS = [
    {
      value : 'DonLon',
      name : 'DonLon',
      distance : 100
    },
    {
      value : 'Enchai',
      name : 'Enchai',
      distance : 200
    },
    {
      value : 'Jebing',
      name : 'Jebing',
      distance : 300
    },
    {
      value : 'Sapir',
      name : 'Sapir',
      distance : 400
    },
    {
      value : 'Lerbin',
      name : 'Lerbin',
      distance : 500
    },
    {
      value : 'Pingosor',
      name : 'Pingosor',
      distance : 600
    },
  ]

//   export class MockServices {

//     public getPlanetList() : any {
        
//         Observable.create((obs) => {
//             obs.next(MOCK_PLANETS);
//         })

//     }
//   }