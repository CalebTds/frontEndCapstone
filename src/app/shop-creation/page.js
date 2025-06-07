'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { useAuth } from '@/utils/context/authContext';
import { Row, Button, Card } from 'react-bootstrap';
import Link from 'next/link';

function GuildHall() {
  const { user } = useAuth();

  return (
    <>
      <div
        className="text-center flex-row"
        style={{
          height: '25vh',
          padding: '30px',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <h1>Welcome to the Merchant&apos;s Guild, {user.displayName}! </h1>
        <p>You&apos;re welcome to make a shop of your own!</p>
        <Link href="/projects/shopCreation" passHref>
          <Button variant="primary" type="button" size="md" className="copy-btn">
            Start Foundations
          </Button>
        </Link>
      </div>
      <div>
        <Row className="m-3 fade-in">
          <Card className="m-3" style={{ width: '18rem', border: '2px solid', padding: '0px' }}>
            <Card.Body>
              <Card.Title>Belial&apos;s Bakery</Card.Title>
              <Card.Text>Sweets and Treats!</Card.Text>
            </Card.Body>
          </Card>

          <Card className="m-3" style={{ width: '18rem', border: '2px solid', padding: '0px' }}>
            <Card.Body>
              <Card.Title>Saehrimnir&apos;s Palace</Card.Title>
              <Card.Text>Broths and Meats!</Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </div>
    </>
  );
}

export default GuildHall;
