import React from "react";
import Typewriter from 'typewriter-effect';

class Home extends React.Component {
    render() {
      return(
        <div>
          <h1 style = {{padding: '15% 20%'}}>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter.typeString('This is the homepage of Covid 19 data analysis page!')
                    .callFunction(() => {
                      console.log('String typed out!');
                    })
                    .pauseFor(2500)
                    .deleteAll()
                    .callFunction(() => {
                      console.log('All strings were deleted');
                    })
                    .start();
                }}
              />
          </h1>
        </div>

      )
    }
  }

export default Home;