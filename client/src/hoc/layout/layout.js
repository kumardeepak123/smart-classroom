import React ,{Component}from "react";
import  './layout.css';
import ToolBar from'../toolbar/toolbar'
import SideDrawer from '../sidedrawer/sideDrawer'
import Footer from "../footer/footer"
import FreeContent   from "../../components/FreeContent"

class Layout extends Component {

  state={
    showSideDrawer: false
  }


  sideDrawerCloseHandler=()=>{
     this.setState({showSideDrawer:false}) ;
  }

  toggleSideDrawerHandler=()=>{

    this.setState((prevState)=>{
  return {showSideDrawer : ! prevState.showSideDrawer}
    })
  }

  render(){

    return(
      <React.Fragment>
       <ToolBar toggleClicked={this.toggleSideDrawerHandler}/>
       <SideDrawer Open={this.state.showSideDrawer} backDropRemove={this.sideDrawerCloseHandler}/>
       <main className="content">{this.props.children}</main>
       <FreeContent/>
       <Footer/>
      </React.Fragment>
    )
  };

}

export default Layout;
