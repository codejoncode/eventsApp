import React from 'react';
import { Segment, Button, Header, Icon } from 'semantic-ui-react';

const NotFound = ({ history }) => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='search' />
        Oops - we've looked everywhere but couldn't find this.
      </Header>
      <Segment>
        <Button onClick={() => history.push('/events')} primary>
          Return to Events page
        </Button>
      </Segment>
    </Segment>
  );
};

export default NotFound;

