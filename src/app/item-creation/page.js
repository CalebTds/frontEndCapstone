'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { useAuth } from '@/utils/context/authContext';
import { Col, Button, Card } from 'react-bootstrap';
import Link from 'next/link';

function Smithy() {
  const { user } = useAuth();

  return (
    <>
      <div
        className="text-center flex-row"
        style={{
          height: '15vh',
          padding: '30px',
          maxWidth: '500px',
          margin: '0 auto',
        }}
      >
        <h1>Welcome, {user.displayName}! </h1>
        <p>Don&apos;t be afraid to create an item yourself!</p>
        <Link href="projects/itemCreation" passHref>
          <Button variant="primary" type="button" size="md" className="copy-btn">
            Begin Crafting
          </Button>
        </Link>
      </div>
      <div>
        <Col className="m-3 fade-in">
          <Card>
            <Card.Header>Belial&apos;s Bakery</Card.Header>
            <Card.Body>
              <Card.Title>Cinnamon Rolls</Card.Title>
              <Card.Text> Bursting with flavor!</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  );
}

export default Smithy;
