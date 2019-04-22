import {Component } from 'react'; 
import {withRouter} from 'react-router-dom'

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        //only called after updating occurs but not called after the initial render
      if (this.props.location.pathname !== prevProps.location.pathname) {
        window.scrollTo(0, 0);
      }
    }
  
    render() {
      return this.props.children;// all react components have children. wrap app around this component so that window resets
    }
  }
  
  export default withRouter(ScrollToTop);