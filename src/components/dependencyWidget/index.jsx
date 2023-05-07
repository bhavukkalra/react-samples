import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './styles.module.css';
import { useState } from 'react';


function AutoLayoutSizingExample() {
  return (
    <Container>
      <Row>
        <Col className={[styles.columnElem, styles.titleBlock].join(' ')}>1 of 3</Col>
        <Col className={styles.columnElem} xs={6}>2 of 3 (wider)</Col>
        <Col>3 of 3</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col xs={5}>2 of 3 (wider)</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
  );
}

function WidgetTry() {
// use map to render each out, state to track which element is selected, render the last element based on conditions for each output

// Store which index tab is active (Not all) (0 index)
const elements = {
    'build': [
        {
            id: 0,
            content: "Post Nightly"

        },
        {
            id: 1,
            content: "Stable"
        }
    ],
    'OS': [
        {
            id: 0,
            content: "MACOS"

        },
        {
            id: 1,
            content: "Windows"

        },
        {
            id: 2,
            content: "Linux"

        }
    ],
    'commands': [
        {
            id: 0,
            content: "Download our Post Nightly and MacoS version here - [Link]",
            renderCondition: {
                "build": 0,
                "os": 0 
            }
            // Contains the position of build tab and OS tab

        },
        {
            id: 1,
            content: "Download our Post Nightly and Windows version here - [Link]",
            renderCondition: {
                "build": 0,
                "os": 1 
            }

        },
        {
            id: 2,
            content: "Download our Post Nightly and Linux version here - [Link]",
            renderCondition: {
                "build": 0,
                "os": 2 
            }

        },
        {
            id: 3,
            content: "Download our Stable and MacoS version here - [Link]",
            renderCondition: {
                "build": 1,
                "os": 0 
            }

        },
        {
            id: 4,
            content: "Download our Stable and Windows version here - [Link]",
            renderCondition: {
                "build": 1,
                "os": 1
            }

        },
        {
            id: 5,
            content: "Download our Stable and Linux version here - [Link]",
            renderCondition: {
                "build": 1,
                "os": 2
            }

        },

    ]
}


    const [currentState, setState] = useState({
        'build': 0,
        'os': 0,
    });

    // Based on above two the "run this" should get decided

    // const handleTabClick = (e) => {
    //     setCurrentTab(e.target.id);
    // }

    const alterCurrentState = (uniqueKey) => {

        const lastId= uniqueKey.at(-1);
        console.log("lastId", lastId)
        const stringIdentifier = uniqueKey.slice(0, -1);
        console.log("stringIdentifier", stringIdentifier);


        // NOTE
        // Cannot assign to currentState (as it is a different elment)
        // We shouldn't reset the other states
        console.log("currentState inside", currentState)

        
        const copyStateObject = {} // works

        for(const key in currentState){
            copyStateObject[key] =  currentState[key]
        }

        console.log("typeof(copyStateObject)", typeof(copyStateObject))

        console.log("copyStateObject", copyStateObject)



        copyStateObject[stringIdentifier] = Number(lastId);

        // currentState = lastId;


        setState(copyStateObject)
        // currentState[stringIdentifier] = Number(lastId);
    }

    const handleStateChange = (e) => {
        console.log(e.target.id);
        // console.log(setState);

        // const lastId= e.target.id[-1];
        alterCurrentState(e.target.id);
        console.log(currentState)
    }

    const renderCommands = (id) => {
        // Compare current state with the valid state
        const allCommandsArray = elements["commands"];
        const renderConditionForCurrentId = allCommandsArray[id]["renderCondition"]

        for(const key in currentState){

            // Value in current State   
            // Comapre the below value with 1st value in  

            if(currentState[key]  != renderConditionForCurrentId[key])
                return false;
            
        }

        return true;
    }


    return (
      <Container>
        {/* <h2>Thid works</h2> */}
        <Row>

          <Col className={[styles.headings].join(' ') + 'col-md-3'}>

            <Col className={styles.blockMain}>Build</Col>
            <Col className={styles.blockMain}> OS</Col>


            <Col className={styles.blockMain}> Run command</Col>

          </Col>





          <Col className='col-md-9'>

            <Row className='ptbuild'>
                {/* Render all the build elements here and track their states id = build, build1.... for unique identification */}

                    {elements['build'].map((keys, indexI) => {
                        console.log("currentState['build']", currentState['build'])
                        return(
                            <Col 
                            lg={6} 
                            md={6}
                            id={'build' + indexI}
                            key={'build' + indexI}
                            className={[currentState['build'] == `${keys['id']}` ? `${styles.selected}`: `${styles.unselected}`, styles.block].join(' ')}
                            onClick={handleStateChange}>
                                
                                {keys.content}

                            </Col>
                        )
                    })
                    }

                    {/* <Col className={[styles.blockTest].join(' ')} lg={6} md={6} >Preview Nightly</Col>
                    <Col lg={6} md={6}>Stable</Col> */}


            </Row>

            <Row className='os'>

                {elements['OS'].map((keys, indexI) => {
                            console.log("currentState['os']", currentState['os'])
                            return(
                                <Col 
                                lg={4} 
                                md={4}
                                id={'os' + indexI}
                                key={'os' + indexI}
                                className={[currentState['os'] == `${keys['id']}` ? `${styles.selected}`: `${styles.unselected}`, styles.block].join(' ')}
                                onClick={handleStateChange}>
                                    
                                {keys.content}

                                </Col>
                            )
                        })
                }

            </Row>


            <Row className='command'>
                {/* Different possibilites will go here, based on the tab selected */}
                {/* Total 6 possibilities, first experiment how to hide a specific block */}


                {elements['commands'].map((keys, indexI) => {
                            // console.log("currentState['os']", currentState['os'])
                            return(
                                <Col 
                                lg={12} 
                                md={12}
                                id={'commands' + indexI}
                                key={'commands' + indexI}
                                className={[renderCommands(indexI) ? `${styles.contentDisplayOk}`: `${styles.contentDisplayNone}`, styles.comandBlock].join(' ')}>
                                    
                                {keys.content}

                                </Col>
                            )
                        })
                }





            </Row>
            
            
            
          </Col> 

        </Row>

      </Container>
    );
  }


  function WidgetTry1() {
    return (
      <Container>
        <h2>asdfsdfsdaf</h2>


      </Container>
    );
  }

export default WidgetTry;