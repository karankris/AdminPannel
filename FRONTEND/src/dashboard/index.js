import React from "react"
import { PieChart } from '@mui/x-charts/PieChart';
import Card from 'react-bootstrap/Card';
import { Container } from "react-bootstrap";
import { Row,Col } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';

function dashboard()
{
  var Count = localStorage.getItem('Pcount');
  var Ucount =localStorage.getItem('Ucount');
  var Vcount =localStorage.getItem('Vcount')

    return(
        <Container>
        <Row className="w-100 ms-4 mt-4">
          <Col >
          <Card style={{ width: '18rem'}} className="mt-3 crd" data-aos="fade-left" data-aos-duration="2000">
          
      <Card.Body className="crdbg">
   
        <Card.Title className="crdtit"> <i className="fa-solid fa-cart-shopping fa-bounce fa-siz"></i> Products <Badge bg="secondary"  className="mb-2  fa-beat" >{Count}</Badge></Card.Title> 
        <Card.Subtitle className="mb-2 text-muted ctxt" style={{fontWeight:"bold"}}>ITEMS</Card.Subtitle>
        <Card.Text  className="ctxt">
           Total number of products in the company. Say farewell to manual inventory checks and hello to real-time updates, preventing overstocking or stockouts.
        </Card.Text>
    
      </Card.Body >
    </Card> 
      </Col>
      <Col>
      <Card style={{ width: '18rem' }} className="mt-3 crd" data-aos="fade-left" data-aos-duration="2000">
      <Card.Body className="crdbg">
        <Card.Title className="crdtit"><i className="fa-solid fa-user fa-bounce  fa-siz"></i> Users <Badge bg="secondary" className="mb-2  fa-beat">{Ucount}</Badge></Card.Title>
        <Card.Subtitle className="mb-2 text-muted ctxt" style={{fontWeight:"bold"}}>USERS</Card.Subtitle>
        <Card.Text  className="ctxt">
          Total number of users in the company. This offers real-time tracking of key user metrics from active users to session durations providing a snapshot of user interactions. 
        </Card.Text>
      </Card.Body>
    </Card> 
      </Col>
      <Col>
      <Card style={{ width: '18rem' }} className="mt-3 crd" data-aos="fade-left" data-aos-duration="2000">
      <Card.Body className="crdbg">
        <Card.Title className="crdtit"> <i className="fa-solid fa-people-group  fa-bounce fa-siz"></i> Vendors  <Badge bg="secondary"  className="mb-2 fa-beat">{Vcount}</Badge></Card.Title>
        <Card.Subtitle className="mb-2 text-muted ctxt" style={{fontWeight:"bold"}}>VENDORS</Card.Subtitle>
        <Card.Text  className="ctxt">
        Total number of vendors in the company. This offers real-time tracking of key user metrics from active seller to session durations providing a snapshot of user interactions. 
        </Card.Text>
      </Card.Body>
    </Card>
      </Col>
  </Row>
  <Row className="w-100 ms-3 mt-4" >
    <Col  sm={4}>
    <Card style={{ width: '18rem'}} className="mt-5 crd" data-aos="fade-left" data-aos-duration="2000">
      <Card.Body className="crdbg">
     
        <Card.Title className="crdtit"> <i className="fa-solid fa-clipboard fa-siz  fa-bounce "></i> Orders <Badge bg="secondary"  className="mb-2 fa-beat">10</Badge></Card.Title>
        <Card.Subtitle className="mb-2 text-muted ctxt" style={{fontWeight:"bold"}}>ORDERS</Card.Subtitle>
        <Card.Text className="ctxt">
        Dive into granular details, track order statuses, identify peak periods, and streamline inventory management with customizable widgets and interactive charts. From monitoring order processing 
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>

    <Col  sm={8}>
    <Card  style={{ width: '25rem'}} className="mt-5 crd_stats" data-aos="fade-left" data-aos-duration="2000">
    <Card.Body className="crdbg"> 
    <Card.Title className="crdtit text-center"> <i className="fa-solid fa-chart-line fa-siz  fa-bounce "> </i> Visualization</Card.Title>
   <PieChart 
  series={[
    {
      data: [
        { id: 0, value: parseInt(Count), label: 'Products', color:"lightgreen"},
        { id: 1,value: parseInt(Ucount), label: 'Users' },
        { id: 2, label: 'vendors', value: parseInt(Vcount) },
        
      ],
      highlightScope: { faded: 'global', highlighted: 'item' },
      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
    },
  ]}
  
  width={340}
  height={200}
/> 
    </Card.Body> 
    </Card>
    </Col>
  </Row>
  
  </Container>   
    );
}
export default dashboard;