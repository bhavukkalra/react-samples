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
    const [currentState, setState] = useState({
        'build': 1,
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
        const newState = {"build": 0, "OS": 0} // works
        newState[stringIdentifier] = Number(lastId);

        // currentState = lastId;


        setState(newState)
        // currentState[stringIdentifier] = Number(lastId);


    }

    const handleStateChange = (e) => {
        console.log(e.target.id);
        // console.log(setState);

        // const lastId= e.target.id[-1];
        alterCurrentState(e.target.id);
        console.log(currentState)
    }

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
        ]
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
                        console.log("currentState['build']", currentState['build'])
                        return(
                            <Col 
                            lg={4} 
                            md={4}
                            id={'build' + indexI}
                            key={'build' + indexI}
                            className={styles.block}>
                                
                                {keys.content}

                            </Col>
                        )
                    })
                    }
                    



            </Row>


            <Row></Row>
            
            
            
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