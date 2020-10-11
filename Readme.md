Steps to run:

1, Clone this Repo and run:  npm i

2, Start this API: node index.js  
      Alternative: nodeman start index.js

3, Using Postman or your webbrowser, see these routes:
    http://www.localhost:3000/api/cases      -See all 1680 cases
    
    http://localhost:3000/api/cases/single/:state/:date            -See one single day case in one specific date
    http://localhost:3000/api/cases/single/Alabama/09-01-2020      -Example 
    
    http://localhost:3000/api/cases/state/:state                   -See all cases in one state
    http://localhost:3000/api/cases/state/Alabama                  -Example; Note capitalized Statename

    http://localhost:3000/api/cases/date/:date                     -See all cases in one day 
    http://localhost:3000/api/cases/date/09-01-2020                -Example
    