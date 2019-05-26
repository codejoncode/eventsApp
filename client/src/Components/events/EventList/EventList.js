import React, { Component } from "react";
import EventListItem from "./EventListItem.js";
import InfiniteScroll from 'react-infinite-scroller';

class EventList extends Component {
  state = {};

  render() {
    //destructor props for the events.
    const { events, loading, moreEvents, getNextEvents } = this.props;
    return (
      <div>
        {events && events.length !== 0 &&
          <InfiniteScroll
           pageStart={0}
           loadMore={getNextEvents}
           hasMore={!loading && moreEvents}
           initialLoad={false}
          >
            {events && events.map((event, index) => (
              <EventListItem
                key={index}
                event={event}
                
              />
            ))}
          </InfiniteScroll>
        }
      </div>
    );
  }
}

export default EventList;
